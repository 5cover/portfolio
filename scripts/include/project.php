<?php
final class Project {
    public readonly array $data;
    function __construct(array $project) {
        $this->data = $project;
    }

    function put_status(string $endDatePlaceholder, string $class='status') { ?>
        <p class="<?php echo $class; ?>"><small><?php
        echo $this->data['start-date'] . " \u{2013} " . ($this->data['end-date'] ?? $endDatePlaceholder); ?></small>
        </p>
    <?php }

    function put_context(string $class='context') { ?>
        <p class="<?php echo $class; ?>"><small><?php echo ucfirst($this->data['context']); ?></small></p>
    <?php }

    function put_abstract(string $class='abstract') { ?>
        <p class="<?php echo $class; ?>"><?php echo $this->data['abstract']; ?></p>
    <?php }

    function put_anchor_list(array $anchors, string $class='list-anchor') { ?>
        <ul class="<?php echo $class; $anchorId = 1; ?>">
            <?php foreach ($this->data['anchors'] as $name => $anchor) { ?>
                <li>
                    <a id="anchor-<?php echo $anchorId++; ?>" href="<?php echo $anchor['href']; ?>" title="<?php echo $name; ?>" target="_blank">
                        <?php
                        $a = $anchors[$anchor['id']];
                        echo get_icon_element($a['isThemedSvg'], $a['url']); ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php }

    function put_logo(Lang $lang, string $class = 'logo') {
        if ($logo = $this->data['logo'] ?? null) {
            echo get_icon_element($logo['isThemedSvg'], $logo['url'], $lang->formatTitle($this->data['title']), $class);
        }
    }

    function put_tags(array $tags, string $class = 'list-tag') { ?>
        <ul class="<?php echo $class; ?>">
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