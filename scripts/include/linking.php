<?php
require_once 'util.php';

// todo: differenciate empty array from empty object. currently empty object become empty array.

final class LinkedData
{
    private mixed $data;
    private readonly string $lang_dir;

    function __construct(mixed $data, string $lang_dir)
    {
        $this->data = $data;
        $this->lang_dir = $lang_dir;
    }

    /**
     * @return array<string, LinkedData>|array<int, LinkedData> All linked key/value pairs of this data.
     */
    function to_array(): array
    {
        assert(is_array($this->data));
        $r = $this->data;
        array_walk($r, fn(&$value, $key) => $value = $this->get($key));
        return $r;
    }

    function get(string|int $key): LinkedData|string|int|float|null|bool
    {
        if (is_array($this->data[$key] ?? null)) {
            $this->data[$key] = $this->link($this->data[$key]);
        }
        return $this->data[$key] ?? null;
    }

    private function link(array $data): LinkedData|string|int|float|null|bool
    {
        if (count($data) === 1 && ($include = $data['$include'] ?? null)) {
            notfalse(ob_start(), 'ob_start');
            require "../fragments/{$this->lang_dir}/$include";
            return notfalse(ob_get_clean(), 'ob_get_clean');
        }
        return new LinkedData($data, $this->lang_dir);
    }

    private function link_all(): mixed
    {
        if (is_array($this->data)) {
            return array_map(fn($item) => $item instanceof LinkedData ? $item->link_all() : $item, $this->to_array());
        }
        return $this->data;
    }

    /** @var array<string, array<string, LinkedData>> */
    private static array $instance_cache = [];

    /**
     * Decode and cache a data JSON file.
     * @param ?Lang $lang the lang, or null for language-agnostic resources
     * @param string $name the filename of the JSON file, relative to the lang directory (or the date directory if $lang is null), without the extension.
     * @param string|int ...$path JSON keys or indexes to follow to get to the desired value
     * @return mixed The result of navigating data JSON @p name to @p path
     */
    static function get_json_file(?Lang $lang, string $name): LinkedData
    {
        $lang_dir = $lang?->key ?? '';
        return static::$instance_cache[$lang_dir][$name]
            ??= new LinkedData(json_decode(notfalse(
                file_get_contents(__DIR__ . "/../../data/$lang_dir/$name.json"),
                "opening JSON data '$lang_dir/$name'"
            ), true), $lang_dir);
    }

    static function copy_all(?Lang $lang)
    {
        $lang_dir = $lang?->key ?? '';

        $old_cwd = getcwd();
        notfalse(chdir("../data/$lang_dir"), 'chdir');
        $data_jsons = notfalse(glob('*.json', GLOB_ERR), 'glob');
        notfalse(chdir($old_cwd), 'chdir');

        foreach ($data_jsons as $json_filename) {
            $ld = static::get_json_file($lang, basename($json_filename, '.json'));

            $outdir = root_path("portfolio/data/$lang_dir");
            notfalse(wp_mkdir_p($outdir), 'wp_mkdir_p');
            $linked = $ld->link_all();
            file_put_contents("$outdir/$json_filename", json_encode($linked, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        }
    }
}
