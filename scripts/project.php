<?php
require_once 'util.php';
require_once 'data.php';

if ($argc != 4) {
    exit("Usage: {$argv[0]} <lang> <id> <project_json>" . PHP_EOL);
}

[$lang, $page] = parse_args();

$p = new Project($lang, $argv[2], json_decode($argv[3], true));
$p->put_page($page);
