<?php
require_once 'help.php';
require_once 'content.php';
require_once 'detail.php';

[$lang, $page] = parse_args();

put_doctype_html($page, $lang);
put_head($page, $lang);

$perspectives = array_map(fn($p) => new Perspective($p), $lang->get_data_json('perspectives'));
?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <h1><?php $lang->get('namePagePerspectives'); ?></h1>
        <?php Perspective::put_cards_list($lang, $perspectives) ?>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>