<?php
require_once 'help.php';
require_once 'data.php';

if ($argc != 4) {
    exit("Usage: {$argv[0]} <lang> <id> <passion_json>" . PHP_EOL);
}

[$lang, $page] = parse_args();

$p = new Passion($lang, $argv[2], json_decode($argv[3], true));
$p->put_page($page);
