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
    <?php put_doctype_html($page, $lang) ?>
    <?php put_head($page, $lang, 'project.css') ?>

    <body>
        <?php put_header($page, $lang) ?>
        <main <?php $p->put_background_style_attr('bg-img') ?>>
            <section id="header"><?php $p->put_tags($lang, $tags) ?>
                <h1><?php echo $p->data['title'] ?></h1>
                <?php $p->put_logo($lang) ?>
                <?php $p->put_abstract() ?>
                <div class="status-context"><?php $p->put_context() ?><?php $p->put_status($lang->get('ongoing')) ?></div>
            </section>
            <section><?php if (count($p->data['links']) > 0) { ?>
                    <ul id="links" class="list-link">
                        <?php $p->put_link_list_items($anchors) ?>
                    </ul>
                <?php } ?>
            </section>
            <section><?php if (count($team = $p->data['team']) > 0) { ?>
                    <h3><?php echo $lang->get('projectTeammates'); ?></h3>
                    <ul id="team"><?php foreach ($team as $personDefId) {
                        put_definition_card($lang, $types, $personDefId, $defintions[$personDefId], "li");
                    } ?>
                    </ul>
                <?php } ?>
            </section>
            <div id="story" class="text"><?php echo $p->data['story'] ?></div>
            <section><?php if (count($techs = $p->data['technologies']) > 0) { ?>
                    <h3><?php echo $lang->get('projectTechnologies') ?></h3>
                    <ul id="technologies"><?php foreach ($techs as $defId) {
                        put_definition_card($lang, $types, $defId, $defintions[$defId], "li");
                    } ?>
                    </ul>
                <?php } ?>
            </section>
            <section><?php if (count($gallery = $p->data['gallery']) > 0) { ?>
                    <h3><?php echo $lang->get('projectGallery') ?></h3>
                    <ul id="gallery">
                        <?php foreach ($gallery as $name => $figure) { ?>
                            <li>
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
                            </li>
                        <?php } ?>
                    </ul>
                <?php } ?>
            </section>
            <section><?php if (count($p->data['references']) > 0) { ?>
                    <h3><?php echo $lang->get('projectReferences') ?></h3>
                    <ol id="references" class="list-reference">
                        <?php $p->put_reference_list_items($lang, $anchors); ?>
                    </ol>
                <?php } ?>
            </section>
        </main>
        <?php put_footer($page, $lang) ?>
        <?php put_scripts($page) ?>
    </body>

    </html>
<?php } ?>