<?php
final class Project {
    public readonly array $data;
    function __construct(array $project) {
        $this->data = $project;
    }

    function put_status(string $endDatePlaceholder, string $class = 'status') { ?>
        <small><?php
        echo $this->data['start-date'] . " \u{2013} " . ($this->data['end-date'] ?? $endDatePlaceholder) ?></small>
    <?php }

    function put_context(string $class = 'context') { ?>
        <small><?php echo ucfirst($this->data['context']) ?></small>
    <?php }

    function put_abstract(string $class = 'abstract') { ?>
        <p class="<?php echo $class ?>"><?php echo $this->data['abstract'] ?></p>
    <?php }


    function put_link_list_compact(array $anchors, string $class = 'list-link') { ?>
        <ul class="<?php echo $class ?>">
            <?php foreach ($this->data['links'] as $name => $link) { ?>
                <li>
                    <a href="<?php echo $link['href'] ?>" title="<?php echo $name ?>" target="_blank" rel="noopener noreferrer">
                        <?php $a = $anchors[$link['anchor']];
                        echo get_icon_element($a['isThemedSvg'], $a['url']) ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php }

    function put_link_list(array $anchors, string $class = 'list-link') { ?>
        <ul class="<?php echo $class ?>">
            <?php foreach ($this->data['links'] as $name => $link) { ?>
                <li>
                    <a class="iconed-text" target="_blank" rel="noopener noreferrer" href="<?php echo $link['href'] ?>">
                        <?php $a = $anchors[$link['anchor']];
                        echo get_icon_element($a['isThemedSvg'], $a['url']) ?>
                        <?php echo $name ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php }

    function put_reference_list(Lang $lang, array $anchors, string $class = 'list-reference') { ?>
        <ol class="<?php echo $class ?>">
            <?php $ref_num = 1;
            foreach ($this->data['references'] as $name => $ref) { ?>
                <li id="ref-<?php echo $ref_num ?>"><span class="ref-backlink" aria-label="<?php echo $lang->get('refJumpUp') ?>"
                        title="<?php echo $lang->get('refJumpUp') ?>"><a class="link" href="#cite-ref-<?php echo $ref_num++ ?>">&uarr;</a></span>
                    <a class="link iconed-text" target="_blank" rel="noopener noreferrer" href="<?php echo $ref['href'] ?>">
                        <?php $a = $anchors[$ref['anchor']];
                        echo get_icon_element($a['isThemedSvg'], $a['url']) ?>
                        <?php echo $name ?>
                    </a>
                </li>
            <?php } ?>
        </ol>
    <?php }

    function put_logo(Lang $lang, string $class = 'logo') {
        if ($logo = $this->data['logo'] ?? null) {
            echo get_icon_element($logo['isThemedSvg'], $logo['url'], $lang->formatTitle($this->data['title']), $class);
        }
    }

    function put_tags(Lang $lang, array $tags, string $class = 'list-rect') { ?>
        <ul class="<?php echo $class ?>">
            <?php foreach ($this->data['tags'] as $tagId) {
                echo <<<HTML
                <li><a href="/portfolio/{$lang->tag}/projects.html?tag=$tagId">{$tags[$tagId]}</a></li>
                HTML;
            } ?>
        </ul>
    <?php }

    function put_background_style_attr(string $varname = 'bg-img') {
        if ($bg = $this->data['background'] ?? null) {
            echo get_background_style_attr($bg, $varname);
        }
    }
}

function put_project_cards_list(Lang $lang, array $projects) {
    $tags = $lang->get_data('tags');
    $anchors = get_data_json('anchors');
    ?>
    <ul class="list-project"><?php
    foreach ($projects as $id => $p) {
        ?>
            <li <?php $p->put_background_style_attr('bg-img-project') ?>>
                <?php $p->put_tags($lang, $tags) ?>
                <?php $p->put_logo($lang) ?>
                <h3><a href="project/<?php echo $id ?>.html"><?php echo $p->data['title'] ?></a></h3>
                <p class="status"><?php $p->put_status($lang->get('ongoing')) ?></p>
                <p class="context"><?php $p->put_context() ?></p>
                <?php $p->put_abstract() ?>
                <?php $p->put_link_list_compact($anchors) ?>
            </li>
            <?php
    }
    ?>
    </ul> <?php
}