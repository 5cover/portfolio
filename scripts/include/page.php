<?php

final class Page
{
    readonly string $name;

    function __construct(string $name)
    {
        $this->name = $name;
    }

    static function named(string $name): static
    {
        return new static($name);
    }

    /**
     * Get the value of the `href` attribute to use for anchors in the navbar.
     * @param string $pageName The name of the page the anchor leads to.
     * @return string *pageName*, unless it is the current page, then `#`.
     */
    function get_nav_href(Lang $lang, string $pageName): string
    {
        return $pageName == $this->name ? '#' : "/portfolio/$lang->name/$pageName.html";
    }

    function get_web_dir(Lang $lang): string
    {
        return get_web_filename("portfolio/$lang->name");  // chaud: there might be an issue here if $this->name contains slashes
    }
}
