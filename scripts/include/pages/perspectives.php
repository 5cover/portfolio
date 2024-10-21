<?php
require_once 'page.php';

function page_perspectives(): Page
{
    return new Page('perspectives', fn(Lang $lang) => put_regular_page($lang, 'perspectives', function () use ($lang) {
?>
<main class="margined">
    <h1><?= $lang->get('namePagePerspectives') ?></h1>
    <?php Perspective::put_card_list($lang->perspectives()) ?>
</main><?php
    }));
}
