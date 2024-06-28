<?php
# Do not include_once or require_once

require_once 'content.php';

$_refNum = 1; # because of this

function link_a(string $content, string $href) {
    ?><a class="link" href="<?php echo $href ?>"><?php echo $content ?></a><?php
}

function link_blank(string $content, string $href) {
    ?><a class="link" target="_blank" rel="noopener noreferrer" href="<?php echo $href ?>"><?php echo $content ?></a><?php
}

function reference() {
    global $_refNum;
    ?><a class="link" id="cite-ref-<?php echo $_refNum ?>" href="#ref-<?php echo $_refNum ?>"><?php echo $_refNum++ ?></a><?php
}

$_definitions = [];

/**
 * Put a definition tooltip trigger.
 * 
 * Uses the unlinked *definitions* data JSON.
 */
function definition(string $lang, string $id) {
    global $_definitions;
    $def = ($_definitions[$lang] ??= get_data_json("$lang/definitions", false))[$id];
    put_definition_tooltip_trigger(Lang::instances()[$lang], $id, $def);
}
