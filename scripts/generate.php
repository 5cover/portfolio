<?php

error_reporting(E_ALL);
chdir(__DIR__);

require_once 'lang.php';

require_once 'pages/root-index.php';
require_once 'pages/but-informatique.php';
require_once 'pages/definitions-test.php';
require_once 'pages/history.php';
require_once 'pages/index.php';
require_once 'pages/passions.php';
require_once 'pages/perspectives.php';
require_once 'pages/projects.php';

page_root_index()->generate(Lang::invariant());
LinkedData::copy_all(null);

foreach (Lang::instances() as $lang) {
    page_but_informatique()->generate($lang);
    page_definitions_test()->generate($lang);
    page_history()->generate($lang);
    page_index()->generate($lang);
    page_passions()->generate($lang);
    page_perspectives()->generate($lang);
    page_projects()->generate($lang);

    foreach (['projects', 'perspectives', 'passions'] as $kind) {
        $details = $lang->$kind();
        foreach ($details as $detail) {
            $detail->generate();
        }
    }

    LinkedData::copy_all($lang);
}
