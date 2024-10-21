<?php
require_once 'util.php';

function generate_page(Lang $lang, string $name, callable $put_page)
{
    error_log("generate $lang->name $name");

    notfalse(ob_start(), 'ob_start');
    $put_page();
    
    $name = explode('/', $name);
    $name_dir = array_slice($name, 0, -1);
    $dirname = root_path("portfolio/$lang->name/" . implode('/', $name_dir));
    wp_mkdir_p($dirname);
    file_put_contents($dirname . "/{$name[count($name)-1]}.html", notfalse(ob_get_clean(), 'ob_get_clean'));
}

final class Page
{
    /** @var callable(Lang): void Put the page. */
    private readonly Closure $_put;
    readonly string $name;

    /**
     * @param string $name The page name.
     * @param callable(Lang): void $put Put the page.
     */
    function __construct(string $name, callable $put)
    {
        $this->_put = $put;
        $this->name = $name;
    }

    public function put(Lang $lang)
    {
        call_user_func($this->_put, $lang);
    }

    function generate(Lang $lang)
    {
        generate_page($lang, $this->name, fn() => $this->put($lang));
    }
}
