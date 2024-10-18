<?php
require_once 'util.php';
require_once 'content.php';

[$lang, $page] = parse_args();

put_doctype_html($page, $lang);
put_head($page, $lang) ?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <dl>
            <?php
                foreach ($lang->definitions() as $definition) {
            ?>
                <dt id="<?= $definition->id ?>"><?= $definition->id ?></dt>
                <dd>
                    <?= implode(', ', $definition->data['name']) ?>
                    <div>
                        <?= $definition->get_tooltip_trigger() ?>
                    </div>
                </dd>
            <?php } ?>
        </dl>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>