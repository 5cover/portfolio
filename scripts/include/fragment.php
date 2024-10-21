<?php
require_once 'util.php';
require_once 'linking.php';
require_once 'content.php';

final class Fragment
{
    private readonly Lang $lang;
    private readonly string $name;
    private $refNum = 1;

    public function __construct(string $filename, string $lang)
    {
        $this->lang = Lang::instances()[$lang];
        $filenamePrefix = notfalse(realpath(__DIR__ . "/../../fragments/{$this->lang->name}"), 'realpath') . '/';
        assert(str_starts_with($filename, $filenamePrefix), "invalid fragment filename: $filename (must start with $filenamePrefix)");
        $this->name = substr($filename, strlen($filenamePrefix));
    }

    /**
     * Gets a term in a language (the current one by default)
     */
    public function term(string $content, ?string $lang = null, ?string $translation = null): string
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
        return "<a class=\"link\" href=\"/{$this->lang->name}/$href\">$content</a>";
    }

    /**
     * Get a an anchor to another project
     *
     * @param string $projectId the project id
     * @param ?string $name the project name, or `null` to use the project name from the data
     */
    public function a_project(string $projectId, ?string $name = null): string
    {
        return $this->a(
            $name ?? LinkedData::get_json_file($this->lang, 'projects')
                         ->get($projectId)
                         ->get('title'),
            'projects/' . $projectId . '.html'
        );
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

    private array $defined = [];

    /**
     * Get a definition tooltip trigger.
     *
     * Uses the unlinked *definitions* data JSON.
     *
     * Defines each id only once. Subsequent calls retrive the localized definition name.
     */
    public function def(string $id, ?string $name = null): string
    {
        return ($def = $this->defined[$id] ?? null)
            ? $name ?? $def->term
            : ($this->defined[$id] = new Definition($this->lang, $id,
                LinkedData::get_json_file($this->lang, 'definitions')
                    ->get($id)))->get_tooltip_trigger($name);
    }
}
