<?php
require_once 'content.php';

function start($lang): Fragment {
    return new Fragment($lang);
}

final class Fragment {
    public readonly Lang $lang;

    private $refNum = 1;

    function __construct(string $langTag) {
        $this->lang = Lang::instances()[$langTag];
    }

    /** Get a term in another language */
    function term(string $content, string $lang = 'en'): string {
        return '<span lang="' . $lang . '">' . $content . '</span>';
    }

    /** Get an inline code */
    function code(string $content): string {
        return '<code>' . htmlspecialchars($content, ENT_HTML5) . '</code>';
    }

    /** Get a code block */
    function codeblock(string $content): string {
        return '<pre>' . $this->code($content) . '</pre>';
    }

    /** Get a year time */
    function year(int $year): string {
        return '<time datetime="' . $year . '">' . $year . '</time>';
    }

    /** Get a site-local anchor
     * 
     * @param string $href the url relative to the site lang directory
     */
    function a(string $content, string $href): string {
        return '<a class="link" href="/portfolio/' . $this->lang->tag . "/$href" . '">' . $content . '</a>';
    }

    /** Get an external anchor */
    function blank(string $content, string $href): string {
        return '<a class="link" target="_blank" rel="noopener noreferrer" href="' . $href . '">' . $content . '</a>';
    }

    /** Get a reference citatiion */
    function ref(): string {
        global $refNum;
        return '<a class="link" id="cite-ref-' . $refNum . '" href="#ref-' . $refNum . '">' . $refNum++ . '</a>';
    }

    /**
     * Get a definition tooltip trigger.
     * 
     * Uses the unlinked *definitions* data JSON.
     */
    function def(string $id): string {
        $def = $this->lang->get_data_json('definitions', false)[$id];
        return get_definition_tooltip_trigger($this->lang, $id, $def);
    }
}