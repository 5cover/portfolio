<?php

final class Page {
    public readonly string $name;
    public function __construct(string $name) {
        $this->name = $name;
    }

    public static function named(string $name): static {
        return new static($name);
    }

    /**
     * Get the value of the `href` attribute to use for anchors in the navbar.
     * @param string $pageName The name of the page the anchor leads to.
     * @return string *pageName*, unless it is the current page, then `#`.
     */
    public function get_nav_href(Lang $lang, string $pageName): string {
        return $pageName == $this->name ? "#" : "/portfolio/$lang->tag/$pageName.html";
    }
}
