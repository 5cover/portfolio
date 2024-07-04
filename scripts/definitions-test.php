<?php
require_once 'help.php';
require_once 'content.php';

[$lang, $page] = parse_args();

put_doctype_html($page, $lang);
put_head($page, $lang);
?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <dl>
            <?php
            $defs = $lang->get_data_json('definitions');
            foreach ($defs as $id => $def) {
                ?>
                <dt id="<?php echo $id ?>"><?php echo $id ?></dt>
                <dd>
                    <?php echo implode(', ', array_splice($def['names'], 1)) ?>
                    <div>
                        <?php echo get_definition_tooltip_trigger($lang, $id, $def) ?>
                    </div>
                </dd>
            <?php } ?>
        </dl>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>