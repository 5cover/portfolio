<?php
require_once 'help.php';
require_once 'content.php';

[$lang, $page] = parse_args();
?> <?php put_doctype_html($page, $lang) ?>
<?php put_head($page, $lang) ?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <dl>
            <?php
            $defs = $lang->get_data('definitions');
            $types = $lang->get_data('types');
            foreach ($defs as $id => $def) {
                $title = $def['names'][0];
                ?>
                <dt id="<?php echo $id ?>"><?php echo $id ?></dt>
                <dd>
                    <?php echo implode(', ', array_splice($def['names'], 1)) ?>
                    <div class="lvl">
                        <a target="_blank" rel="noopener noreferrer" href="<?php echo $def['wiki'] ?>" class="link definition-tooltip-trigger"><?php echo $title ?></a>
                        <?php put_definition_tooltip($lang, $types, $id, $def) ?>
                    </div>
                </dd>
            <?php } ?>
        </dl>
    </main>
    <?php put_footer($page, $lang) ?>
    <?php put_scripts($page) ?>
</body>

</html>