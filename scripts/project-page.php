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
    $tags = get_data_json($lang->tag . '/tags');
    $defintions = get_data_json($lang->tag . '/definitions');
    $types = get_data_json($lang->tag . '/types');
    ?>
    <?php put_doctype_html($page, $lang); ?>
    <?php put_head($page, $lang); ?>

    <body>
        <?php put_header($page, $lang); ?>
        <main>
            <?php $p->put_tags($tags); ?>
            <div>
                <h2><?php echo $p->data['title']; ?></h2>
                <?php $p->put_logo($lang); ?>
            </div>
            <?php $p->put_abstract(); ?>
            <?php $p->put_context(); ?>
            <?php $p->put_status('en cours'); ?>
            <?php $p->put_anchor_list($anchors); ?>
            <?php $p->put_story(); ?>
            <h3>Technologies</h3>
            <ul><?php foreach ($p->data['technologies'] as $defId) {
                $def = $defintions[$defId];
                $logo = $def['logo'];
                ?>
                    <li>
                        <?php echo get_icon_element($logo['isThemedSvg'], $logo['url'], 'Logo ' . $def['names'][0], 'definition-tooltip-trigger', 60) ?>
                        <?php put_definition_tooltip($lang, $types, $defId, $def); ?>
                    </li>
                <?php } ?>
            </ul>
            <h3>Gallerie</h3>
            <div class="gallery"><?php foreach ($p->data['gallery'] as $name => $url) { ?>
                    <figure>
                        <?php echo get_img_element($url, $name, baseHeight: 300); ?>
                        <figcaption><?php echo $name ?></figcaption>
                    </figure>
                <?php } ?>
            </div>
        </main>
        <?php put_footer($page, $lang); ?>
        <?php put_scripts($page); ?>
    </body>

    </html>
<?php } ?>