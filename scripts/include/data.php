<?php
require_once 'content.php';
require_once 'lang.php';

function validate_json_object(array $jsonObject, iterable $keys) {
    foreach ($keys as $key) {
        if (!array_key_exists($key, $jsonObject)) {
            throw new Exception("key {$key} missing from json object");
        }
    }
}

abstract class Data {
    readonly string $id;
    protected readonly Lang $lang;
    readonly array $data;

    protected function __construct(Lang $lang, string $id, array $jsonData, array $keys = []) {
        validate_json_object($jsonData, $keys);
        $this->lang = $lang;
        $this->id = $id;
        $this->data = $jsonData;
    }
}

final class Definition extends Data {
    private readonly string $title;
    private readonly string $term;

    function __construct(Lang $lang, string $id, array $jsonData) {
        parent::__construct($lang, $id, $jsonData);
        $name = $jsonData['name'];
        $this->title = $name['full'];
        $this->term = $name['abbr'] ?? $name['short'] ?? $name['full'];
    }

    function get_tooltip_trigger(): string {
        return '<a target="_blank" rel="noopener noreferrer" href="' . $this->data['wiki']
            . '" data-definition-id="' . $this->id
            . '" class="link definition-tooltip-trigger">'
            . $this->term . '</a>';
    }

    function put_card() {
        $types = $this->lang->get_data_json('types');
        ?>
        <article class="definition" <?php if ($bg = $this->data['background'] ?? null)
            echo get_background_style_attr($bg, 'bg-img-card'); ?>>
            <h4 class="title"><a target="_blank" rel="noopener noreferrer" href="<?= $this->data['wiki'] ?>"><?= $this->title ?></a>
            </h4>
            <?php if ($logo = $this->data['logo'] ?? null)
                echo get_graphic_element($logo['isThemedSvg'], $logo['url'], $this->lang->formatTitle($this->title), 'logo'); ?>
            <p class="type"><small><?= ucfirst($types[$this->data['type']]) ?></small></p>
            <p class="synopsis"><?= $this->data['synopsis'] ?></p>
        </article>
    <?php }

    static function put_card_list(iterable $definitions) {
        ?>
        <ul class="lvl list-definition">
            <?php foreach ($definitions as $definition) { ?>
                <li><?php $definition->put_card() ?></li>
            <?php } ?>
        </ul>
    <?php }
}

abstract class Details extends Data {
    private readonly string $stylesheet;

    const DEFAULT_CARD_HEADING_LEVEL = 3;

    protected function __construct(Lang $lang, string $id, array $jsonData, string $stylesheet, array $specificKeys = []) {
        parent::__construct($lang, $id, $jsonData, array_merge($specificKeys, [
            'abstract',
            # optional: 'background'
            'gallery',
            'links',
            # optional: 'logo',
            'references',
            'story',
            'title',
        ]));
        $this->stylesheet = $stylesheet;
    }

    function put_page(Page $page) {
        put_doctype_html($page, $this->lang);
        put_head($page, $this->lang, $this->stylesheet);
        ?>

        <body><?php
        put_header($page, $this->lang);
        $this->put_page_main();
        put_footer($page, $this->lang);
        ?></body><?php
    }

    abstract function put_page_main();
    abstract function put_card(int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL);

    protected function put_abstract() { ?>
        <p class="abstract"><?= $this->data['abstract'] ?></p>
    <?php }

    protected function put_card_link_list() {
        $anchors = get_data_json('anchors');
        ?>
        <ul class="list-link">
            <?php foreach ($this->data['links'] as $name => $link) { ?>
                <li>
                    <a href="<?= $link['href'] ?>" title="<?= $name ?>" target="_blank" rel="noopener noreferrer">
                        <?php $a = $anchors[$link['anchor']];
                        echo get_graphic_element($a['isThemedSvg'], $a['url']) ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php }

    protected function put_page_link_list() {
        $anchors = get_data_json('anchors');
        ?>
        <ul class="lvl list-link">
            <?php foreach ($this->data['links'] as $name => $link) { ?>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href="<?= $link['href'] ?>">
                        <?php $a = $anchors[$link['anchor']];
                        echo get_graphic_element($a['isThemedSvg'], $a['url']) ?>
                        <span><?= $name ?></span>
                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php }

    protected function put_reference_list() {
        $anchors = get_data_json('anchors');
        ?>
        <ol class="list-reference">
            <?php $ref_num = 1;
            foreach ($this->data['references'] as $ref) { ?>
                <li id="ref-<?= $ref_num ?>"><span class="ref-backlink" aria-label="<?= $this->lang->get('refJumpUp') ?>" title="<?= $this->lang->get('refJumpUp') ?>"><a class="link" href="#cite-ref-<?= $ref_num++ ?>">&uarr;</a></span>
                    <a class="link" target="_blank" rel="noopener noreferrer" href="<?= $ref['href'] ?>">
                        <?php $a = $anchors[$ref['anchor']];
                        echo get_graphic_element($a['isThemedSvg'], $a['url']) ?>
                        <span><?= $ref['caption'] ?></span>
                    </a>
                </li>
            <?php } ?>
        </ol>
    <?php }

    protected function put_story() { ?>
        <section id="story">
            <h2><?= $this->lang->get('story') ?></h2>
            <?= $this->data['story'] ?>
        </section>
    <?php }

    protected function put_logo() {
        if ($logo = $this->data['logo'] ?? null) {
            echo get_graphic_element($logo['isThemedSvg'], $logo['url'], $this->lang->formatTitle($this->data['title']), 'logo');
        }
    }

    protected function put_background_style_attr(string $varname = 'bg-img') {
        if ($bg = $this->data['background'] ?? null) {
            echo get_background_style_attr($bg, $varname);
        }
    }

    protected function put_gallery() {
        $gallery_num = 1;
        if (count($gallery = $this->data['gallery']) > 0) { ?>
            <section id="gallery">
                <h2><?= $this->lang->get('gallery') ?></h2>
                <ul class="lvl gallery">
                    <?php foreach ($gallery as $figure) { ?>
                        <li>
                            <figure id="gallery-<?= $gallery_num++ ?>" class="figure">
                                <?php
                                $caption = $figure['caption'];
                                if ($url = $figure['url'] ?? null) {
                                    echo get_img_element($url, $caption, baseHeight: 300);
                                } elseif ($src = $figure['iframe-src'] ?? null) {
                                    echo get_iframe($src, $caption);
                                } else {
                                    echo $figure['content'];
                                }
                                ?>
                                <figcaption><?= $caption ?></figcaption>
                            </figure>
                        </li>
                    <?php } ?>
                </ul>
            </section>
        <?php }
    }
}

final class Passion extends Details {
    function __construct(Lang $lang, string $id, array $jsonData) {
        parent::__construct($lang, $id, $jsonData, 'passion.css');
    }

    function put_page_main() {
        ?>
        <main <?php $this->put_background_style_attr() ?>>
            <header>
                <h1><?= $this->data['title'] ?></h1>
                <?php $this->put_logo() ?>
                <?php $this->put_abstract() ?>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h2><?= $this->lang->get('links') ?></h2>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php }
            $this->put_story();
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h2><?= $this->lang->get('references') ?></h2>
                    <?php $this->put_reference_list(); ?>
                </section>
            <?php }
            $this->put_gallery(); ?>
        </main>
    <?php }

    function put_card(int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL) {
        ?>
        <li id="<?= $this->id ?>" <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php $this->put_logo() ?>
            <div>
                <?php
                echo element("h$headingLevel", "<a href=\"passion/$this->id.html\">{$this->data['title']}</a>");
                $this->put_abstract();
                $this->put_card_link_list() ?>
            </div>
        </li>
        <?php
    }

    static function put_card_list(iterable $passions) { ?>
        <ul class="lvl list-detail-split-card"><?php
        foreach ($passions as $p) {
            $p->put_card();
        }
        ?>
        </ul> <?php
    }
}

final class Perspective extends Details {
    function __construct(Lang $lang, string $id, array $jsonData) {
        parent::__construct($lang, $id, $jsonData, 'perspective.css');
    }

    function put_page_main() {
        ?>
        <main <?php $this->put_background_style_attr() ?>>
            <header>
                <h1><?= $this->data['title'] ?></h1>
                <?php $this->put_logo() ?>
                <?php $this->put_abstract() ?>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h2><?= $this->lang->get('links') ?></h2>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php }
            $this->put_story();
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h2><?= $this->lang->get('references') ?></h2>
                    <?php $this->put_reference_list(); ?>
                </section>
            <?php }
            $this->put_gallery(); ?>
        </main>
    <?php }

    function put_card(int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL) {
        ?>
        <li id="<?= $this->id ?>" <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php $this->put_logo() ?>
            <div>
                <?php
                echo element("h$headingLevel", "<a href=\"perspective/$this->id.html\">{$this->data['title']}</a>");
                $this->put_abstract();
                $this->put_card_link_list() ?>
            </div>
        </li>
        <?php
    }

    static function put_card_list(iterable $perspectives) { ?>
        <ul class="lvl list-detail-split-card"><?php
        foreach ($perspectives as $p) {
            $p->put_card();
        }
        ?>
        </ul> <?php
    }
}

final class Project extends Details {
    function __construct(Lang $lang, string $id, array $jsonData) {
        parent::__construct($lang, $id, $jsonData, 'project.css', [
            'context',
            # optional: 'end-date'
            'start-date',
            'tags',
            'team',
            'technologies',
        ]);
    }

    function put_page_main() {
        ?>
        <main <?php $this->put_background_style_attr() ?>>
            <header>
                <?php $this->put_tags() ?>
                <h1><?= $this->data['title'] ?></h1>
                <?php $this->put_logo() ?>
                <?php $this->put_abstract() ?>
                <div class="status-context"><?php $this->put_context() ?><?php $this->put_status() ?></div>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h2><?= $this->lang->get('links') ?></h2>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php }
            if (count($team = $this->data['team']) > 0) { ?>
                <section id="team">
                    <h2><?= $this->lang->get('team') ?></h2>
                    <?php Definition::put_card_list(array_filter($this->lang->definitions(), fn($d) => in_array($d->id, $team))) ?>
                </section>
            <?php }
            $this->put_story();
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h2><?= $this->lang->get('references') ?></h2>
                    <?php $this->put_reference_list(); ?>
                </section>
            <?php }
            if (count($technologies = $this->data['technologies']) > 0) { ?>
                <section id="technologies">
                    <h2><?= $this->lang->get('technologies') ?></h2>
                    <?php Definition::put_card_list(array_filter($this->lang->definitions(), fn($d) => in_array($d->id, $technologies))) ?>
                </section>
            <?php }
            $this->put_gallery(); ?>
        </main>
    <?php }

    function put_card(int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL) {
        ?>
        <li <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php
            $this->put_tags();
            $this->put_logo();
            echo element("h$headingLevel", "<a href=\"project/$this->id.html\">{$this->data['title']}</a>");
            $this->put_status();
            $this->put_context();
            $this->put_abstract();
            $this->put_card_link_list() ?>
        </li>
        <?php
    }

    protected function put_tags() {
        $tags = $this->lang->get_data_json('tags');
        ?>
        <ul class="list-rect">
            <?php foreach ($this->data['tags'] as $tagId) {
                echo "<li><a href=\"/portfolio/{$this->lang->tag}/projects.html?tag=$tagId\">{$tags[$tagId]}</a></li>";
            } ?>
        </ul>
    <?php }

    private function put_status() {
        $endDate = $this->data['end-date'] ?? false;
        ?><small class="status"><?php $this->put_date($this->data['start-date']) ?> &ndash; <?php
           if ($endDate) {
               $this->put_date($endDate);
           } else {
               echo $this->lang->get('ongoing');
           } ?></small>
    <?php }

    private function put_context() { ?>
        <small class="context"><?= ucfirst($this->data['context']) ?></small>
    <?php }

    static function put_card_list(iterable $projects, int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL) { ?>
        <ul class="lvl list-project"><?php
        foreach ($projects as $p) {
            $p->put_card($headingLevel);
        }
        ?>
        </ul> <?php
    }

    private function put_date(string $date) {
        ?><time datetime="<?= $date ?>"><?= $this->lang->formatDate(parse_date($date)) ?></time><?php
    }

}
