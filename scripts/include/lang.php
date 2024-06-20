<?php
require_once 'help.php';

final class Lang {
    private static array|null $instances = null;
    private readonly array $strings;
    public readonly string $tag;
    public readonly string $name;
    public function __construct(string $tag, array $strings) {
        $this->tag = $tag;
        $this->strings = $strings;
        $this->name = $strings['names'][$tag];
    }

    public function get(string $name): string {
        return $this->strings[$name];
    }

    public function nameof(Lang $other): string {
        return $this->strings['names'][$other->tag];
    }

    public function formatTitle(string $title): string {
        return sprintf($this->strings['formatTitle'], $title);
    }

    public function get_data(string $name): array {
        return get_data_json($this->tag . '/' . $name);
    }

    public function equals(Lang $other): bool {
        return $this->tag === $other->tag;
    }

    /**
     * Get all langs, keyed by language tag.
     */
    public static function instances(): array {
        if (static::$instances === null) {
            static::$instances = [];
            foreach (get_data_json('langs') as $tag => $strings) {
                static::$instances[$tag] = new static($tag, $strings);
            }
            
        }
        return static::$instances;
    }
}