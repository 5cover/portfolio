<?php

function validate_json_object(array $jsonObject, array $keys) {
    foreach ($keys as $key) {
        if (!array_key_exists($key, $jsonObject)) {
            throw new Exception("key {$key} missing from json object");
        }
    }
}

abstract class Details {
    readonly array $data;

    private readonly string $stylesheet;

    const DEFAULT_CARD_HEADING_LEVEL = 3;

    protected function __construct(string $stylesheet, array $jsonData, array $specificKeys) {
        validate_json_object($jsonData, [
            'abstract',
            # optional: 'background'
            'gallery',
            'links',
            # optional: 'logo',
            'references',
            'story',
            'title',
        ]);
        validate_json_object($jsonData, $specificKeys);
        $this->stylesheet = $stylesheet;
        $this->data = $jsonData;
    }

    function put_page(Page $page, Lang $lang) {
        put_doctype_html($page, $lang);
        put_head($page, $lang, $this->stylesheet);
        ?>

        <body><?php
        put_header($page, $lang);
        $this->put_page_main($lang);
        put_footer($page, $lang);
        ?></body><?php
    }

    abstract function put_page_main(Lang $lang);
    abstract function put_card(Lang $lang, string $id, int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL);

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

    protected function put_reference_list(Lang $lang) {
        $anchors = get_data_json('anchors');
        ?>
        <ol class="list-reference">
            <?php $ref_num = 1;
            foreach ($this->data['references'] as $name => $ref) { ?>
                <li id="ref-<?= $ref_num ?>"><span class="ref-backlink" aria-label="<?= $lang->get('refJumpUp') ?>" title="<?= $lang->get('refJumpUp') ?>"><a class="link" href="#cite-ref-<?= $ref_num++ ?>">&uarr;</a></span>
                    <a class="link" target="_blank" rel="noopener noreferrer" href="<?= $ref['href'] ?>">
                        <?php $a = $anchors[$ref['anchor']];
                        echo get_graphic_element($a['isThemedSvg'], $a['url']) ?>
                        <span><?= $name ?></span>
                    </a>
                </li>
            <?php } ?>
        </ol>
    <?php }

    protected function put_story(Lang $lang) { ?>
        <section id="story">
            <h2><?= $lang->get('story') ?></h2>
            <?= $this->data['story'] ?>
        </section>
    <?php }

    protected function put_logo(Lang $lang) {
        if ($logo = $this->data['logo'] ?? null) {
            echo get_graphic_element($logo['isThemedSvg'], $logo['url'], $lang->formatTitle($this->data['title']), 'logo');
        }
    }

    protected function put_background_style_attr(string $varname = 'bg-img') {
        if ($bg = $this->data['background'] ?? null) {
            echo get_background_style_attr($bg, $varname);
        }
    }

    protected function put_gallery(Lang $lang) {
        $gallery_num = 1;
        if (count($gallery = $this->data['gallery']) > 0) { ?>
            <section id="gallery">
                <h2><?= $lang->get('gallery') ?></h2>
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
    function __construct(array $jsonPassion) {
        parent::__construct('passion.css', $jsonPassion, []);
    }

    function put_page_main(Lang $lang) {
        ?>
        <main <?php $this->put_background_style_attr() ?>>
            <header>
                <h1><?= $this->data['title'] ?></h1>
                <?php $this->put_logo($lang) ?>
                <?php $this->put_abstract() ?>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h2><?= $lang->get('links') ?></h2>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php }
            $this->put_story($lang);
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h2><?= $lang->get('references') ?></h2>
                    <?php $this->put_reference_list($lang); ?>
                </section>
            <?php }
            $this->put_gallery($lang); ?>
        </main>
    <?php }

    function put_card(Lang $lang, string $id, int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL) {
        ?>
        <li id="<?= $id ?>" <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php $this->put_logo($lang) ?>
            <div>
                <?php element("h$headingLevel", "<a href=\"passion/$id.html\">{$this->data['title']}</a>") ?>
                <?php $this->put_abstract() ?>
                <?php $this->put_card_link_list() ?>
            </div>
        </li>
        <?php
    }

    static function put_cards_list(Lang $lang, array $passions) { ?>
        <ul class="lvl list-detail-split-card"><?php
        foreach ($passions as $id => $p) {
            $p->put_card($lang, $id);
        }
        ?>
        </ul> <?php
    }
}

final class Perspective extends Details {
    function __construct(array $jsonPerspective) {
        parent::__construct('perspective.css', $jsonPerspective, []);
    }

    function put_page_main(Lang $lang) {
        ?>
        <main <?php $this->put_background_style_attr() ?>>
            <header>
                <h1><?= $this->data['title'] ?></h1>
                <?php $this->put_logo($lang) ?>
                <?php $this->put_abstract() ?>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h2><?= $lang->get('links') ?></h2>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php }
            $this->put_story($lang);
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h2><?= $lang->get('references') ?></h2>
                    <?php $this->put_reference_list($lang); ?>
                </section>
            <?php }
            $this->put_gallery($lang); ?>
        </main>
    <?php }

    function put_card(Lang $lang, string $id, int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL) {
        ?>
        <li id="<?= $id ?>" <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php $this->put_logo($lang) ?>
            <div>
                <?php element("h$headingLevel", "<a href=\"perspective/$id.html\">{$this->data['title']}</a>") ?>
                <?php $this->put_abstract() ?>
                <?php $this->put_card_link_list() ?>
            </div>
        </li>
        <?php
    }

    static function put_cards_list(Lang $lang, array $perspectives) { ?>
        <ul class="lvl list-detail-split-card"><?php
        foreach ($perspectives as $id => $p) {
            $p->put_card($lang, $id);
        }
        ?>
        </ul> <?php
    }
}

final class Project extends Details {
    function __construct(array $jsonProject) {
        parent::__construct('project.css', $jsonProject, [
            'context',
            # optional: 'end-date'
            'start-date',
            'tags',
            'team',
            'technologies',
        ]);
    }

    function put_page_main(Lang $lang) {
        ?>
        <main <?php $this->put_background_style_attr() ?>>
            <header>
                <?php $this->put_tags($lang) ?>
                <h1><?= $this->data['title'] ?></h1>
                <?php $this->put_logo($lang) ?>
                <?php $this->put_abstract() ?>
                <div class="status-context"><?php $this->put_context() ?><?php $this->put_status($lang) ?></div>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h2><?= $lang->get('links') ?></h2>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php }
            if (count($team = $this->data['team']) > 0) { ?>
                <section id="team">
                    <h2><?= $lang->get('team') ?></h2>
                    <?php put_definition_list($lang, $team) ?>
                </section>
            <?php }
            $this->put_story($lang);
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h2><?= $lang->get('references') ?></h2>
                    <?php $this->put_reference_list($lang); ?>
                </section>
            <?php }
            if (count($technologies = $this->data['technologies']) > 0) { ?>
                <section id="technologies">
                    <h2><?= $lang->get('technologies') ?></h2>
                    <?php put_definition_list($lang, $technologies) ?>
                </section>
            <?php }
            $this->put_gallery($lang); ?>
        </main>
    <?php }

    function put_card(Lang $lang, string $id, int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL) {
        ?>
        <li <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php
            $this->put_tags($lang);
            $this->put_logo($lang) ?>
            <?php element("h$headingLevel", "<a href=\"project/$id.html\">{$this->data['title']}</a>") ?>
            <?php
            $this->put_status($lang);
            $this->put_context();
            $this->put_abstract();
            $this->put_card_link_list() ?>
        </li>
        <?php
    }

    protected function put_tags(Lang $lang) {
        $tags = $lang->get_data_json('tags');
        ?>
        <ul class="list-rect">
            <?php foreach ($this->data['tags'] as $tagId) {
                echo "<li><a href=\"/portfolio/{$lang->tag}/projects.html?tag=$tagId\">{$tags[$tagId]}</a></li>";
            } ?>
        </ul>
    <?php }

    private function put_status(Lang $lang) {
        $endDate = $this->data['end-date'] ?? false;
        ?><small class="status"><?php static::put_date($lang, $this->data['start-date']) ?> &ndash; <?php
            if ($endDate) {
                static::put_date($lang, $endDate);
            } else {
                echo $lang->get('ongoing');
            } ?></small>
    <?php }

    private function put_context() { ?>
        <small class="context"><?= ucfirst($this->data['context']) ?></small>
    <?php }

    static function put_cards_list(Lang $lang, array $projects, int $headingLevel = Details::DEFAULT_CARD_HEADING_LEVEL) { ?>
        <ul class="lvl list-project"><?php
        foreach ($projects as $id => $p) {
            $p->put_card($lang, $id, $headingLevel);
        }
        ?>
        </ul> <?php
    }

    private static function put_date(Lang $lang, string $date) {
        ?><time datetime="<?= $date ?>"><?= $lang->formatDate(parse_date($date)) ?></time><?php
    }

}
