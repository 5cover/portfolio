<?php
require_once 'page.php';

function page_definitions_test(): Page
{
    return new Page('definitions-test', fn(Lang $lang) => put_regular_page($lang, 'definitions-test', function () use ($lang) {
?>
<main class="margined">
    <dl>
        <?php
        foreach ($lang->definitions() as $definition) {
        ?>
        <dt id="<?= $definition->id ?>"><?= $definition->id ?></dt>
        <dd>
            <?= implode(', ', $definition->data->get('name')->to_array()) ?>
            <div>
                <?= $definition->get_tooltip_trigger() ?>
            </div>
        </dd>
        <?php } ?>
    </dl>
</main>

</html>
<?php
    }));
}
