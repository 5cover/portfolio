<?php
# Do not include_once or require_once

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
