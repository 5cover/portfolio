<?php
require_once 'data.php';
require_once 'help.php';

final class Lang {
    private static array|null $instances = null;
    private readonly array $strings;
    readonly string $tag;
    readonly string $name;
    private readonly IntlDateFormatter $fmt;
    function __construct(string $tag, array $strings) {
        $this->tag = $tag;
        $this->strings = $strings;
        $this->name = $strings['names'][$tag];
        $this->fmt = new IntlDateFormatter($tag, IntlDateFormatter::LONG, IntlDateFormatter::NONE);
    }

    function formatDate(DateTimeInterface $dateTime) {
        $res = $this->fmt->format($dateTime);
        if ($res === false) {
            throw new Exception("IntlDateFormatter::format failed");
        }
        return $res;
    }

    function get(string $name): string {
        return $this->strings[$name];
    }

    function nameof(Lang $other): string {
        return $this->strings['names'][$other->tag];
    }

    function formatTitle(string $title): string {
        return sprintf($this->strings['formatTitle'], $title);
    }

    function get_data_json(string $name, bool $linked = true): array {
        return get_data_json($this->tag . '/' . $name, $linked);
    }

    private readonly array $datas;
    private function get_data(string $name, callable $makeObject): iterable {
        return $this->datas[$name] ??= array_map_entries($makeObject, $this->get_data_json($name));
    }

    function definitions(): iterable {
        return $this->get_data('definitions', fn($id, $json) => new Definition($this, $id, $json));

    }
    function projects(): iterable {
        return $this->get_data('projects', fn($id, $json) => new Project($this, $id, $json));
    }

    function passions(): iterable {
        return $this->get_data('passions', fn($id, $json) => new Passion($this, $id, $json));
    }

    function perspectives(): array {
        return $this->get_data('perspectives', fn($id, $json) => new Perspective($this, $id, $json));
    }

    function equals(Lang $other): bool {
        return $this->tag === $other->tag;
    }

    /**
     * Get all langs, keyed by language tag.
     */
    static function instances(): array {
        if (static::$instances === null) {
            static::$instances = [];
            foreach (get_data_json('langs') as $tag => $strings) {
                static::$instances[$tag] = new static($tag, $strings);
            }

        }
        return static::$instances;
    }
}