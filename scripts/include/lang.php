<?php
require_once 'data.php';
require_once 'help.php';

const INVARIANT_LANG_KEY = 'en';

final class Lang {
    private static array|null $instances = null;
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
        return expect($this->fmt->format($dateTime), 'IntlDateFormatter::format');
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

    function get_data_json(string $name, bool $linked = true): array {
        return get_data_json($this->name . '/' . $name, $linked);
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
        return $this->name === $other->name;
    }

    /**
     * Get all langs, keyed by language name.
     */
    static function instances(): array {
        if (static::$instances === null) {
            static::$instances = [];
            foreach (get_data_json('langs') as $key => $strings) {
                static::$instances[$key] = new static($key, $key, $strings);
            }
            assert(array_key_exists(INVARIANT_LANG_KEY, static::$instances), 'Lang of invariant language key must exist');
            static::$instances[''] = new static('', INVARIANT_LANG_KEY, static::$instances[INVARIANT_LANG_KEY]->strings);

        }
        return static::$instances;
    }
}