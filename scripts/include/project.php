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

    function put_link_list(array $anchors, string $class = 'list-link') { ?>
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

    function put_reference_list(Lang $lang, array $anchors, string $class = 'list-reference') { ?>
        <ol class="<?php echo $class ?>">
            <?php $ref_num = 1;
            foreach ($this->data['references'] as $name => $ref) { ?>
                <li id="ref-<?php echo $ref_num ?>"><span class="ref-backlink" aria-label="<?php echo $lang->get('refJumpUp') ?>"
                        title="<?php echo $lang->get('refJumpUp') ?>"><a class="link" href="#cite-ref-<?php echo $ref_num++ ?>">&uarr;</a></span>
                    <a class="link" target="_blank" rel="noopener noreferrer" href="<?php echo $ref['href'] ?>" title="<?php echo $name ?>">
                        <?php $a = $anchors[$ref['anchor']];
                        echo get_icon_element($a['isThemedSvg'], $a['url'], class: 'text-icon') ?>
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

    function put_tags(array $tags, string $class = 'list-tag') { ?>
        <ul class="<?php echo $class ?>">
            <?php foreach ($this->data['tags'] as $tagId) {
                echo <<<HTML
                <li><a href="projects.html?tag=$tagId">{$tags[$tagId]}</a></li>
                HTML;
            } ?>
        </ul>
    <?php }

    function put_background_style_attr(string $varname) {
        if ($bg = $this->data['background'] ?? null) {
            echo get_background_style_attr($varname, $bg);
        }
    }
}

function put_project_cards_list(Lang $lang, callable $predicate, int $mode = 0) {
    $tags = $lang->get_data('tags');
    $anchors = get_data_json('anchors');
    ?>
    <ul class="list-project"><?php
    foreach (array_filter(array_map(fn($p) => new Project($p), $lang->get_data('projects')), $predicate, $mode) as $id => $p) {
        ?>
            <li <?php $p->put_background_style_attr('bg-img') ?>>
                <?php $p->put_tags($tags) ?>
                <?php $p->put_logo($lang) ?>
                <h3><a href="project/<?php echo $id ?>.html"><?php echo $p->data['title'] ?></a></h3>
                <p class="status"><?php $p->put_status($lang->get('ongoing')) ?></p>
                <p class="context"><?php $p->put_context() ?></p>
                <?php $p->put_abstract() ?>
                <?php $p->put_link_list($anchors) ?>
            </li>
            <?php
    }
    ?>
    </ul> <?php
}