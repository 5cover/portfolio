<?php
require_once 'page.php';

abstract class Detail
{
    protected readonly Lang $lang;
    readonly string $id, $kind;
    readonly LinkedData $data;
    private readonly string $stylesheet;

    const DEFAULT_CARD_HEADING_LEVEL = 3;

    protected function __construct(Lang $lang, string $kind, string $id, LinkedData $data, string $stylesheet)
    {
        $this->lang = $lang;
        $this->kind = $kind;
        $this->id = $id;
        $this->data = $data;
        $this->stylesheet = $stylesheet;
    }

    function generate()
    {
        $page_name = "$this->kind/$this->id";
        generate_page($this->lang, $page_name, fn() => put_regular_page($this->lang, $page_name, $this->put_main(...), $this->stylesheet));
    }

    abstract protected function put_main();
    abstract function put_card(int $headingLevel = Detail::DEFAULT_CARD_HEADING_LEVEL);

    protected function put_abstract()
    {
?>
<p class="abstract"><?= $this->data->get('abstract') ?></p>
<?php
    }

    protected function put_card_link_list()
    {
?><ul class="list-link"><?php
        foreach ($this->data->get('links')->to_array() as $name => $link) {
?><li><a href="<?= $link->get('href') ?>" title="<?= $name ?>" target="_blank" rel="noopener noreferrer"><?php
            $a = LinkedData::get_json_file(null, 'anchors')->get($link->get('anchor'));
            echo get_graphic_element($a->get('isThemedSvg'), $a->get('url'))
?></a></li><?php } ?>
</ul><?php
    }

    protected function put_page_link_list()
    {
?><ul class="lvl list-link">
    <?php foreach ($this->data->get('links')->to_array() as $name => $link) { ?>
    <li>
        <a target="_blank" rel="noopener noreferrer" href="<?= $link->get('href') ?>">
            <?php $a = LinkedData::get_json_file(null, 'anchors')->get($link->get('anchor')) ?>
            <?= get_graphic_element($a->get('isThemedSvg'), $a->get('url')) ?>
            <span><?= $name ?></span>
        </a>
    </li>
    <?php } ?>
</ul>
<?php
    }

    protected function put_reference_list()
    {
?><ol class="list">
    <?php
        $ref_num = 1;
        foreach ($this->data->get('references')->to_array() as $ref) {
    ?>
    <li id="ref-<?= $ref_num ?>"><span class="ref-backlink" aria-label="<?= $this->lang->get('refJumpUp') ?>" title="<?= $this->lang->get('refJumpUp') ?>"><a class="link" href="#cite-ref-<?= $ref_num++?>">&uarr;</a></span>
        <a class="ref-cite link" target="_blank" rel="noopener noreferrer" href="<?= $ref->get('href') ?>">
            <?php $a = LinkedData::get_json_file(null, 'anchors')->get($ref->get('anchor'));
            echo get_graphic_element($a->get('isThemedSvg'), $a->get('url')) ?>
            <span><?= $ref->get('caption') ?></span>
        </a>
    </li>
    <?php } ?>
</ol>
<?php
    }

    protected function put_story()
    {
?>
<section id="story">
    <h2><?= $this->lang->get('story') ?></h2>
    <?= $this->data->get('story') ?>
</section>
<?php
    }

    protected function put_logo()
    {
        if ($logo = $this->data->get('logo') ?? null) {
            echo get_graphic_element(
                $logo->get('isThemedSvg'),
                $logo->get('url'),
                $this->lang->fmtTitle($this->data->get('title')),
                'logo'
            );
        }
    }

    protected function put_background_style_attr(string $varname = 'bg-img')
    {
        if ($bg = $this->data->get('background') ?? null) {
            echo get_background_style_attr($bg, $varname);
        }
    }

    protected function put_gallery()
    {
        $gallery_num = 1;
        if (count($gallery = $this->data->get('gallery')->to_array()) > 0) {
?>
<section id="gallery">
    <h2><?= $this->lang->get('gallery') ?></h2>
    <ul class="lvl gallery">
        <?php
            foreach ($gallery as $figure) {
        ?>
        <li>
            <figure id="gallery-<?= $gallery_num++?>" class="figure">
                <?php
                $caption = $figure->get('caption');
                if ($url = $figure->get('url')) {
                    echo get_img_element($url, $caption, baseHeight: 300);
                } elseif ($src = $figure->get('iframe-src')) {
                    echo get_iframe($src, $caption);
                } else {
                    echo $figure->get('content');
                }
                ?>
                <figcaption><?= $caption ?></figcaption>
            </figure>
        </li>
        <?php
            }
        ?>
    </ul>
</section>
<?php
        }
    }
}

final class Passion extends Detail
{
    function __construct(Lang $lang, string $id, LinkedData $data)
    {
        parent::__construct($lang, 'passions', $id, $data, 'passion.css');
    }

    protected function put_main()
    {
?>
<main <?php $this->put_background_style_attr() ?>>
    <header>
        <h1><?= $this->data->get('title') ?></h1>
        <?php $this->put_logo() ?>
        <?php $this->put_abstract() ?>
    </header>
    <?php if (count($this->data->get('links')->to_array()) > 0) { ?>
    <section id="links">
        <h2><?= $this->lang->get('links') ?></h2>
        <?php $this->put_page_link_list() ?>
    </section>
    <?php }
        $this->put_story();
        if (count($this->data->get('references')->to_array()) > 0) { ?>
    <section id="references">
        <h2><?= $this->lang->get('references') ?></h2>
        <?php $this->put_reference_list() ?>
    </section>
    <?php }
        $this->put_gallery() ?>
</main>
<?php
    }

    function put_card(int $headingLevel = Detail::DEFAULT_CARD_HEADING_LEVEL)
    {
?>
<li id="<?= $this->id ?>" <?php $this->put_background_style_attr('bg-img-card') ?>>
    <?php $this->put_logo() ?>
    <div>
        <?php
        echo element("h$headingLevel", "<a class=\"foil\" href=\"passions/$this->id.html\">{$this->data->get('title')}</a>");
        $this->put_abstract();
        $this->put_card_link_list()
        ?>
    </div>
</li>
<?php
    }

    /**
     * Puts a list of cards for displaying passions.
     *
     * @param iterable<static> $passions The iterable collection of passions.
     * @return void
     */
    static function put_card_list(iterable $passions)
    {
?>
<ul class="lvl list-detail-split-card">
    <?php
        foreach ($passions as $p) {
            $p->put_card();
        }
    ?>
</ul> <?php
    }
}

final class Perspective extends Detail
{
    function __construct(Lang $lang, string $id, LinkedData $data)
    {
        parent::__construct($lang, 'perspectives', $id, $data, 'perspective.css');
    }

    protected function put_main()
    {
?>
<main <?php $this->put_background_style_attr() ?>>
    <header>
        <h1><?= $this->data->get('title') ?></h1>
        <?php $this->put_logo() ?>
        <?php $this->put_abstract() ?>
    </header>
    <?php if (count($this->data->get('links')->to_array()) > 0) { ?>
    <section id="links">
        <h2><?= $this->lang->get('links') ?></h2>
        <?php $this->put_page_link_list() ?>
    </section>
    <?php }
        $this->put_story();
        if (count($this->data->get('references')->to_array()) > 0) { ?>
    <section id="references">
        <h2><?= $this->lang->get('references') ?></h2>
        <?php $this->put_reference_list() ?>
    </section>
    <?php }
        $this->put_gallery() ?>
</main>
<?php
    }

    function put_card(int $headingLevel = Detail::DEFAULT_CARD_HEADING_LEVEL)
    {
?>
<li id="<?= $this->id ?>" <?php $this->put_background_style_attr('bg-img-card') ?>>
    <?php $this->put_logo() ?>
    <div>
        <?= element("h$headingLevel", "<a class=\"foil\" href=\"perspectives/$this->id.html\">{$this->data->get('title')}</a>") ?>
        <?php $this->put_abstract();
        $this->put_card_link_list() ?>
    </div>
</li>
<?php
    }

    /**
     * Puts a list of cards for displaying perspectives.
     *
     * @param iterable<static> $perspectives The iterable collection of perspectives.
     * @return void
     */
    static function put_card_list(iterable $perspectives)
    {
?>
<ul class="lvl list-detail-split-card">
    <?php
        foreach ($perspectives as $p) {
            $p->put_card();
        }
    ?>
</ul> <?php
    }
}

final class Project extends Detail
{
    function __construct(Lang $lang, string $id, LinkedData $data)
    {
        parent::__construct($lang, 'projects', $id, $data, 'project.css');
    }

    protected function put_main()
    {
?>
<main <?php $this->put_background_style_attr() ?>>
    <header>
        <?php $this->put_tags() ?>
        <h1><?= $this->data->get('title') ?></h1>
        <?php $this->put_logo() ?>
        <?php $this->put_abstract() ?>
        <div class="status-context"><?php $this->put_context() ?><?php $this->put_status() ?></div>
    </header>
    <?php if (count($this->data->get('links')->to_array()) > 0) { ?>
    <section id="links">
        <h2><?= $this->lang->get('links') ?></h2>
        <?php $this->put_page_link_list() ?>
    </section>
    <?php }
        if (count($team = $this->data->get('team')->to_array()) > 0) { ?>
    <section id="team">
        <h2><?= $this->lang->get('team') ?></h2>
        <?php Definition::put_card_list(array_filter($this->lang->definitions(), fn($d) => in_array($d->id, $team))) ?>
    </section>
    <?php }
        $this->put_story();
        if (count($this->data->get('references')->to_array()) > 0) { ?>
    <section id="references">
        <h2><?= $this->lang->get('references') ?></h2>
        <?php $this->put_reference_list() ?>
    </section>
    <?php }
        if (count($technologies = $this->data->get('technologies')->to_array()) > 0) { ?>
    <section id="technologies">
        <h2><?= $this->lang->get('technologies') ?></h2>
        <?php Definition::put_card_list(array_filter($this->lang->definitions(), fn($d) => in_array($d->id, $technologies))) ?>
    </section>
    <?php }
        $this->put_gallery() ?>
</main>
<?php
    }

    function put_card(int $headingLevel = Detail::DEFAULT_CARD_HEADING_LEVEL)
    {
?>
<li <?php $this->put_background_style_attr('bg-img-card') ?>>
    <?php
        $this->put_tags();
        $this->put_logo();
        echo element("h$headingLevel", "<a class=\"foil\" href=\"projects/$this->id.html\">{$this->data->get('title')}</a>");
        $this->put_status();
        $this->put_context();
        $this->put_abstract();
        $this->put_card_link_list()
    ?>
</li>
<?php
    }

    protected function put_tags()
    {
        $tags = LinkedData::get_json_file($this->lang, 'tags')
?>
<ul class="list-rect">
    <?php foreach ($this->data->get('tags')->to_array() as $tagId) {
            echo "<li><a href=\"/portfolio/{$this->lang->name}/projects.html?tag=$tagId\">{$tags->get($tagId)}</a></li>";
        } ?>
</ul>
<?php
    }

    private function put_status()
    {
        $endDate = $this->data->get('end-date') ?? false
?><small class="status"><?php $this->put_date($this->data->get('start-date')) ?> &ndash;
    <?php
        if ($endDate) {
            $this->put_date($endDate);
        } else {
            echo $this->lang->get('ongoing');
        }
    ?></small>
<?php
    }

    private function put_context()
    {
?>
<small class="context"><?= ucfirst($this->data->get('context')) ?></small>
<?php
    }

    /**
     * Puts a list of cards for displaying projects.
     *
     * @param iterable<static> $projects The iterable collection of projects.
     * @return void
     */
    static function put_card_list(iterable $projects, int $headingLevel = Detail::DEFAULT_CARD_HEADING_LEVEL)
    {
?>
<ul class="lvl list-project">
    <?php
        foreach ($projects as $p) {
            $p->put_card($headingLevel);
        }
    ?>
</ul> <?php
    }

    private function put_date(string $date)
    {
?><time datetime="<?= $date ?>"><?= $this->lang->formatDate(parse_date($date)) ?></time><?php
    }
}
