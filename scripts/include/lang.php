<?php
require_once 'util.php';
require_once 'linking.php';
require_once 'definition.php';

/** The key of the actual lang of the invariant lang. */
// const INVARIANT_LANG_KEY = 'en';

final class Lang
{
    private static ?array $instances = null;

    /** @var string Name of the language. Identical to $key, expect for the invariant language, where it is an empty string. */
    readonly string $name;
    /** @var string Key to use to lookup localized resources. Is equal to INVARIANT_LANG_KEY for the invariant language. */
    readonly string $key;
    private LinkedData $data;
    private readonly IntlDateFormatter $fmt;

    private function __construct(string $name, string $key)
    {
        $this->name = $name;
        $this->key = $key;
        $this->fmt = new IntlDateFormatter($key, IntlDateFormatter::LONG, IntlDateFormatter::NONE);
        $this->data = LinkedData::get_json_file($this, 'lang');
    }

    private static ?Lang $_invariant;

    static function invariant(): Lang
    {
        return static::$_invariant ??= new Lang('', 'en');
    }

    /**
     * Get all langs, keyed by language name.
     * @return array<string, Lang> The instances of Lang, keyed by language name.
     */
    static function instances(): array
    {
        return static::$instances ??= static::fetch_instances();
    }

    /**
     * Fetch all langs, keyed by language name.
     * @return array<string, Lang> The instances of Lang, keyed by language name.
     */
    private static function fetch_instances(): array
    {
        // $inst = ['' => new static('', INVARIANT_LANG_KEY)];
        foreach (LinkedData::get_json_file(null, 'langs')->to_array() as $lang) {
            $inst[$lang] = new static($lang, $lang);
        }
        // assert(array_key_exists(INVARIANT_LANG_KEY, $inst), 'Lang of invariant lang key must exist');
        return $inst;
    }

    function equals(Lang $other): bool
    {
        return $this->name === $other->name;
    }

    function formatDate(DateTimeInterface $dateTime)
    {
        return notfalse($this->fmt->format($dateTime), 'IntlDateFormatter::format');
    }

    function get(string $name): LinkedData|string|int|float|null|bool
    {
        return $this->data->get($name);
    }

    function nameof(Lang $other): string
    {
        return $this->data->get('names')->get($other->key);
    }

    function fmtTitle(string $title): string
    {
        return sprintf($this->data->get('fmtTitle'), $title);
    }

    /** @var array<string, array> */
    private array $datas = [];

    /**
     * Get data objects
     * @template T
     * @param string $name Name of the data kind.
     * @param callable(string, LinkedData): T $makeObject Makes the data object
     * @return array<string, T> The data objects
     */
    private function get_data(string $name, callable $makeObject): array
    {
        $data = LinkedData::get_json_file($this, $name)->to_array();
        return $this->datas[$name] ??= array_map_entries($makeObject, $data);
    }

    /**
     * Retrieves an array of definitions.
     *
     * @return array<string, Definition> An array of Definition objects, keyed by id.
     */
    function definitions(): array
    {
        return $this->get_data('definitions', fn($id, $data) => new Definition($this, $id, $data));
    }

    /**
     * Retrieves an array of Projects.
     *
     * @return array<string, Project> An array of Project objects, keyed by id.
     */
    function projects(): array
    {
        return $this->get_data('projects', fn($id, $data) => new Project($this, $id, $data));
    }

    /**
     * Retrieves an array of passion.
     *
     * @return array<string, Passion> An array of Passion objects, keyed by id.
     */
    function passions(): array
    {
        return $this->get_data('passions', fn($id, $data) => new Passion($this, $id, $data));
    }

    /**
     * Retrieves an array of perspectives.
     *
     * @return array<string, Perspective> An array of Perspective objects, keyed by id.
     */
    function perspectives(): array
    {
        return $this->get_data('perspectives', fn($id, $json) => new Perspective($this, $id, $json));
    }
}
