<?php
require_once 'data.php';
require_once 'util.php';

const INVARIANT_LANG_KEY = 'en';

final class Lang {
    private static array|null $instances = null;
    /** @var array<string, string> */
    private readonly array $strings;
    readonly string $key; # Key used to lookup strings
    readonly string $name; # Unique identifier
    private readonly IntlDateFormatter $fmt;
    function __construct(string $name, string $key, array $strings) {
        $this->name = $name;
        $this->key = $key;
        $this->strings = $strings;
        $this->fmt = new IntlDateFormatter($key, IntlDateFormatter::LONG, IntlDateFormatter::NONE);
    }

    function formatDate(DateTimeInterface $dateTime) {
        return notfalse($this->fmt->format($dateTime), 'IntlDateFormatter::format');
    }

    function get(string $name): string {
        return $this->strings[$name];
    }

    function nameof(Lang $other): string {
        return $this->strings['names'][$other->key];
    }

    function formatTitle(string $title): string {
        return sprintf($this->strings['formatTitle'], $title);
    }

    /**
     * Decode and cache a localized data JSON file.
     * @param string $name the filename of the JSON file, relative to the data directory, without the extension.
     * @return array<string, mixed> The decoded JSON, in associative mode.
     */
    function get_data_json(string $name, bool $linked = true): array {
        return get_data_json($this->name . '/' . $name, $linked);
    }

    /** @var array<string, array> */
    private readonly array $datas;
    /**
     * Get data objects
     * @template T
     * @param string $name Name of the data kind.
     * @param callable(string, array): T $makeObject Makes the data object
     * @return array<string, T> The data objects
     */
    private function get_data(string $name, callable $makeObject): array {
        return $this->datas[$name] ??= array_map_entries($makeObject, $this->get_data_json($name));
    }

    /**
     * Retrieves an array of definitions.
     *
     * @return array<string, Definition> An array of Definition objects, keyed by id.
     */
    function definitions(): array {
        return $this->get_data('definitions', fn($id, $json) => new Definition($this, $id, $json));
    }
    /**
     * Retrieves an array of Projects.
     *
     * @return array<string, Project> An array of Project objects, keyed by id.
     */
    function projects(): array {
        return $this->get_data('projects', fn($id, $json) => new Project($this, $id, $json));
    }
    /**
     * Retrieves an array of passion.
     *
     * @return array<string, Passion> An array of Passion objects, keyed by id.
     */
    function passions(): array {
        return $this->get_data('passions', fn($id, $json) => new Passion($this, $id, $json));
    }
    /**
     * Retrieves an array of perspectives.
     *
     * @return array<string, Perspective> An array of Perspective objects, keyed by id.
     */
    function perspectives(): array {
        return $this->get_data('perspectives', fn($id, $json) => new Perspective($this, $id, $json));
    }

    function equals(Lang $other): bool {
        return $this->name === $other->name;
    }

    /**
     * Get all langs, keyed by language name.
     * @return array<string, Lang> The instances of Lang, keyed by language name.
     */
    static function instances(): array {
        return static::$instances ??= static::fetch_instances();
    }

    /**
     * Fetch all langs, keyed by language name.
     * @return array<string, Lang> The instances of Lang, keyed by language name.
     */
    private static function fetch_instances(): array {
        $inst = [];
        foreach (get_data_json('langs') as $key => $strings) {
            $inst[$key] = new static($key, $key, as_array($strings));
        }
        assert(array_key_exists(INVARIANT_LANG_KEY, $inst), 'Lang of invariant language key must exist');
        $inst[''] = new static('', INVARIANT_LANG_KEY, $inst[INVARIANT_LANG_KEY]->strings);
        return $inst;
    }
}
