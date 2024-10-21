<?php
require_once 'page.php';

function page_passions(): Page
{
    return new Page('passions', fn(Lang $lang) => put_regular_page($lang, 'passions', function () use ($lang) {
?>
<main class="margined">
    <h1><?= $lang->get('namePagePassions') ?></h1>
    <?php Passion::put_card_list($lang->passions()) ?>
</main><?php
    }));
}
