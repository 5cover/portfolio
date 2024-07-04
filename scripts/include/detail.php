<?php

function validate_json_object(array $jsonObject, array $keys) {
    foreach ($keys as $key) {
        if (!array_key_exists($key, $jsonObject)) {
            throw new Exception("key {$key} missing from json object");
        }
    }
}

abstract class Details {
    public readonly array $data;

    private readonly string $stylesheet;

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
    abstract function put_card(Lang $lang, string $id);

    protected function put_abstract() { ?>
        <p class="abstract"><?php echo $this->data['abstract'] ?></p>
    <?php }

    protected function put_card_link_list() {
        $anchors = get_data_json('anchors');
        ?>
        <ul class="list-link">
            <?php foreach ($this->data['links'] as $name => $link) { ?>
                <li>
                    <a href="<?php echo $link['href'] ?>" title="<?php echo $name ?>" target="_blank" rel="noopener noreferrer">
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
                    <a target="_blank" rel="noopener noreferrer" href="<?php echo $link['href'] ?>">
                        <?php $a = $anchors[$link['anchor']];
                        echo get_graphic_element($a['isThemedSvg'], $a['url']) ?>
                        <span><?php echo $name ?></span>
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
                <li id="ref-<?php echo $ref_num ?>"><span class="ref-backlink" aria-label="<?php echo $lang->get('refJumpUp') ?>" title="<?php echo $lang->get('refJumpUp') ?>"><a class="link" href="#cite-ref-<?php echo $ref_num++ ?>">&uarr;</a></span>
                    <a class="link" target="_blank" rel="noopener noreferrer" href="<?php echo $ref['href'] ?>">
                        <?php $a = $anchors[$ref['anchor']];
                        echo get_graphic_element($a['isThemedSvg'], $a['url']) ?>
                        <span><?php echo $name ?></span>
                    </a>
                </li>
            <?php } ?>
        </ol>
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
                <h3><?php echo $lang->get('gallery') ?></h3>
                <ul class="lvl gallery">
                    <?php foreach ($gallery as $figure) { ?>
                        <li>
                            <figure id="gallery-<?php echo $gallery_num++ ?>" class="figure">
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
                                <figcaption><?php echo $caption ?></figcaption>
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
                <h1><?php echo $this->data['title'] ?></h1>
                <?php $this->put_logo($lang) ?>
                <?php $this->put_abstract() ?>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h3><?php echo $lang->get('links') ?></h3>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php } ?>
            <section id="story" class="text">
                <h3><?php echo $lang->get('story') ?></h3>
                <?php echo $this->data['story'] ?>
            </section>
            <?php $this->put_gallery($lang);
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h3><?php echo $lang->get('references') ?></h3>
                    <?php $this->put_reference_list($lang); ?>
                </section>
            <?php } ?>
        </main>
    <?php }

    function put_card(Lang $lang, string $id) {
        ?>
        <li id="<?php echo $id ?>" <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php $this->put_logo($lang) ?>
            <div>
                <h3><a href="passion/<?php echo $id ?>.html"><?php echo $this->data['title'] ?></a></h3>
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
                <h1><?php echo $this->data['title'] ?></h1>
                <?php $this->put_logo($lang) ?>
                <?php $this->put_abstract() ?>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h3><?php echo $lang->get('links') ?></h3>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php } ?>
            <section id="story" class="text">
                <h3><?php echo $lang->get('story') ?></h3>
                <?php echo $this->data['story'] ?>
            </section>
            <?php $this->put_gallery($lang);
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h3><?php echo $lang->get('references') ?></h3>
                    <?php $this->put_reference_list($lang); ?>
                </section>
            <?php } ?>
        </main>
    <?php }

    function put_card(Lang $lang, string $id) {
        ?>
        <li id="<?php echo $id ?>" <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php $this->put_logo($lang) ?>
            <div>
                <h3><a href="perspective/<?php echo $id ?>.html"><?php echo $this->data['title'] ?></a></h3>
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
                <h1><?php echo $this->data['title'] ?></h1>
                <?php $this->put_logo($lang) ?>
                <?php $this->put_abstract() ?>
                <div class="status-context"><?php $this->put_context() ?><?php $this->put_status($lang) ?></div>
            </header>
            <?php if (count($this->data['links']) > 0) { ?>
                <section id="links">
                    <h3><?php echo $lang->get('links') ?></h3>
                    <?php $this->put_page_link_list() ?>
                </section>
            <?php }
            if (count($team = $this->data['team']) > 0) { ?>
                <section id="team">
                    <h3><?php echo $lang->get('team') ?></h3>
                    <?php put_definition_list($lang, $team) ?>
                </section>
            <?php } ?>
            <section id="story" class="text">
                <h3><?php echo $lang->get('story') ?></h3>
                <?php echo $this->data['story'] ?>
            </section>
            <?php if (count($technologies = $this->data['technologies']) > 0) { ?>
                <section id="technologies">
                    <h3><?php echo $lang->get('technologies') ?></h3>
                    <?php put_definition_list($lang, $technologies) ?>
                </section>
            <?php }
            $this->put_gallery($lang);
            if (count($this->data['references']) > 0) { ?>
                <section id="references">
                    <h3><?php echo $lang->get('references') ?></h3>
                    <?php $this->put_reference_list($lang); ?>
                </section>
            <?php } ?>
        </main>
    <?php }

    function put_card(Lang $lang, string $id) {
        ?>
        <li <?php $this->put_background_style_attr('bg-img-card') ?>>
            <?php $this->put_tags($lang) ?>
            <?php $this->put_logo($lang) ?>
            <h3><a href="project/<?php echo $id ?>.html"><?php echo $this->data['title'] ?></a></h3>
            <p class="status"><?php $this->put_status($lang) ?></p>
            <p class="context"><?php $this->put_context() ?></p>
            <?php $this->put_abstract() ?>
            <?php $this->put_card_link_list() ?>
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
        ?><small><?php static::put_date($lang, $this->data['start-date']) ?> &ndash; <?php
            if ($endDate) {
                static::put_date($lang, $endDate);
            } else {
                echo $lang->get('ongoing');
            } ?></small>
    <?php }

    private function put_context() { ?>
        <small><?php echo ucfirst($this->data['context']) ?></small>
    <?php }

    static function put_cards_list(Lang $lang, array $projects) { ?>
        <ul class="lvl list-project"><?php
        foreach ($projects as $id => $p) {
            $p->put_card($lang, $id);
        }
        ?>
        </ul> <?php
    }

    private static function put_date(Lang $lang, string $date) {
        ?><time datetime="<?php echo $date ?>"><?php echo $lang->formatDate(parse_date($date)) ?></time><?php
    }

}
