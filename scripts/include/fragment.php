<?php
require_once 'util.php';
require_once 'content.php';

function start(string $lang): Fragment
{
    return new Fragment($lang);
}

final class Fragment
{
    readonly Lang $lang;

    private $refNum = 1;

    public function __construct(string $langTag)
    {
        $this->lang = Lang::instances()[$langTag];
    }

    /**
     * Gets a term in a language (the current one by default)
     */
    public function term(string $content, string|null $lang = null, string|null $translation = null): string
    {
        $html = '<em' . map(fn($l) => " lang=\"$l\"", $lang) . '>' . $content . '</em>';
        if ($translation !== null) {
            $html = "<abbr title=\"$translation\">$html</abbr>";
        }

        return $html;
    }

    /**
     * Get an inline code
     */
    public function code(string $content): string
    {
        return '<code>' . htmlspecialchars($content, ENT_HTML5) . '</code>';
    }

    /**
     * Get a code block
     */
    public function codeblock(string $content): string
    {
        return '<pre>' . $this->code($content) . '</pre>';
    }

    /**
     * Get a year time
     */
    public function year(int $year): string
    {
        return '<time datetime="' . $year . '">' . $year . '</time>';
    }

    /**
     * Get a site-local anchor
     *
     * @param string $href the url relative to the site lang directory
     */
    public function a(string $content, string $href): string
    {
        return '<a class="link" href="/portfolio/' . $this->lang->name . "/$href" . '">' . $content . '</a>';
    }

    /**
     * Get an external anchor
     */
    public function blank(string $content, string $href): string
    {
        return '<a class="link" target="_blank" rel="noopener noreferrer" href="' . $href . '">' . $content . '</a>';
    }

    /**
     * Get a reference citatiion
     */
    public function ref(): string
    {
        return '<sup id="cite-ref-' . $this->refNum . '"><a class="link" href="#ref-' . $this->refNum . '">[' . $this->refNum++ . ']</a></sup>';
    }

    /**
     * Get a definition tooltip trigger.
     *
     * Uses the unlinked *definitions* data JSON.
     */
    public function def(string $id): string
    {
        $def = $this->lang->get_data_json('definitions', false)[$id];
        return (new Definition($this->lang, $id, $def))->get_tooltip_trigger();
    }
}
