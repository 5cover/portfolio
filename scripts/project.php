<?php
require_once 'help.php';
require_once 'project.php';
require_once 'content.php';

if ($argc != 4) {
    var_dump($argv);
    exit("Usage: {$argv[0]} <lang> <id> <project_json>" . PHP_EOL);
}

[$lang, $page] = parse_args();

put_project_page($lang, $page, $argv[3]);

function put_project_page(Lang $lang, Page $page, string $projectJson) {
    $p = new Project(json_decode($projectJson, true));

    $anchors = get_data_json('anchors');
    $tags = $lang->get_data('tags');
    $defintions = $lang->get_data('definitions');
    $types = $lang->get_data('types');
    ?>
    <?php put_doctype_html($page, $lang); ?>
    <?php put_head($page, $lang, 'project.css'); ?>

    <body>
        <?php put_header($page, $lang); ?>
        <main <?php $p->put_background_style_attr('bg-img'); ?>>
            <div id="project-header">
                <?php $p->put_tags($tags); ?>
                <h2><?php echo $p->data['title']; ?></h2>
                <?php $p->put_logo($lang); ?>
                <?php $p->put_abstract(); ?>
                <div class="status-context"><?php $p->put_context(); ?><?php $p->put_status($lang->get('ongoing')); ?></div>
            </div>
            <?php if (count($techs = $p->data['technologies']) > 0) { ?>
                <h3><?php echo $lang->get('projectTechnologies'); ?></h3>
                <ul id="technologies"><?php foreach ($techs as $defId) {
                    $def = $defintions[$defId];
                    $logo = $def['logo'] ?? null;
                    ?>
                        <li>
                            <?php if ($logo) {
                                echo get_icon_element($logo['isThemedSvg'], $logo['url'], 'Logo ' . $def['names'][0], 'definition-tooltip-trigger', 60);
                            } else {
                                echo $def['names'][0];
                            } ?>
                            <?php put_definition_tooltip($lang, $types, $defId, $def); ?>
                        </li>
                    <?php } ?>
                </ul>
            <?php } ?>
            <div id="story"><?php echo $p->data['story']; ?></div>
            <?php if (count($p->data['anchors']) > 0) { ?>
                <h3><?php echo $lang->get('projectLinks'); ?></h3>
                <?php $p->put_anchor_list($anchors, useAnchorId: true); ?>
            <?php }
            if (count($gallery = $p->data['gallery']) > 0) { ?>
                <h3><?php echo $lang->get('projectGallery'); ?></h3>
                <div id="gallery"><?php foreach ($gallery as $name => $figure) { ?>
                        <figure class="figure">
                            <?php
                            if ($url = $figure['url'] ?? null) {
                                echo get_img_element($url, $name, baseHeight: 300);
                            } elseif ($src = $figure['iframe-src'] ?? null) {
                                put_iframe($src, $name);
                            } else {
                                echo $figure['content'];
                            }
                            ?>
                            <figcaption><?php echo $name ?></figcaption>
                        </figure>
                    <?php } ?>
                </div>
            <?php } ?>
        </main>
        <?php put_footer($page, $lang); ?>
        <?php put_scripts($page); ?>
    </body>

    </html>
<?php } ?>