<?php
require_once 'util.php';
require_once 'content.php';
require_once 'lang.php';

[$lang, $page] = parse_args();

put_doctype_html($page, $lang);
put_head($page, $lang);

?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <h1><?php $lang->get('namePagePerspectives'); ?></h1>
        <?php Perspective::put_card_list($lang->perspectives()) ?>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>