<?php
require_once 'help.php';
require_once 'content.php';
require_once 'detail.php';

[$lang, $page] = parse_args();

put_doctype_html($page, $lang);
put_head($page, $lang);

$passions = array_map(fn($p) => new Passion($p), $lang->get_data_json('passions'));
?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <h1><?php $lang->get('namePagePassions'); ?></h1>
        <?php Passion::put_cards_list($lang, $passions) ?>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>