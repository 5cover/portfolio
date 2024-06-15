<?php
final class Project {
    public readonly array $data;
    function __construct(array $project) {
        $this->data = $project;
    }

    function put_status(string $endDatePlaceholder) { ?>
        <p class="status"><small><?php
        echo $this->data['start-date'] . " \u{2013} " . ($this->data['end-date'] ?? $endDatePlaceholder); ?></small>
        </p>
    <?php }

    function put_context() { ?>
        <p class="context"><small><?php echo ucfirst($this->data['context']); ?></small></p>
    <?php }

    function put_abstract() { ?>
        <p class="abstract"><?php echo $this->data['abstract']; ?></p>
    <?php }

    function put_anchor_list(array $anchors) { ?>
        <ul class="list-anchors">
            <?php foreach ($this->data['anchors'] as $name => $anchor) { ?>
                <li>
                    <a href="<?php echo $anchor['href']; ?>" title="<?php echo $name; ?>" target="_blank">
                        <?php
                        $a = $anchors[$anchor['id']];
                        echo get_icon_element($a['isThemedSvg'], $a['url']); ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php }

    function put_story() { ?>
        <div class="story"><?php echo $this->data['story']; ?></div>
    <?php }

    function put_logo(Lang $lang) {
        if ($logo = $this->data['logo'] ?? null) {
            echo get_icon_element($logo['isThemedSvg'], $logo['url'], $lang->formatTitle($this->data['title']), 'logo');
        }
    }

    function put_tags(array $tags) { ?>
        <ul class="list-tag">
            <?php foreach ($this->data['tags'] as $tagId) {
                echo <<<HTML
                <li><a href="projects.html?tag=$tagId">{$tags[$tagId]}</a></li>
                HTML;
            } ?>
        </ul>
    <?php }

    function put_background_style_attr() {
        if ($bg = $this->data['background'] ?? null) {
            echo get_background_style_attr($bg);
        }
    }
}