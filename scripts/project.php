<?php
require_once 'help.php';
require_once 'detail.php';
require_once 'content.php';

if ($argc != 4) {
    exit("Usage: {$argv[0]} <lang> <id> <project_json>" . PHP_EOL);
}

[$lang, $page] = parse_args();

$p = new Project(json_decode($argv[3], true));
$p->put_page($page, $lang);