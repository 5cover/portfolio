<?php
require_once 'page.php';

function page_projects(): Page
{
    return new Page('projects', fn(Lang $lang) => put_regular_page($lang, 'projects', function () use ($lang) {
?>
<main>
    <datalist id="project-titles">
        <!-- Fill this up dynamically -->
    </datalist>
    <section class="lvl" id="search-bar">
        <h1><?= $lang->get('projectSearchSearch') ?></h1>
        <input incremental type="search" id="search-input" placeholder="<?= $lang->get('projectSearchPlaceholder') ?>" autocomplete="on" list="project-titles">
        <section>
            <h3><?= $lang->get('projectSearchTags') ?></h3>
            <ul class="lvl list-rect" id="list-tag">
                <!-- Tags will be added here -->
            </ul>
        </section>
        <section>
            <h3><?= $lang->get('projectSearchSort') ?></h3>
            <ul class="lvl list-rect" id="list-sorting">
                <li><label for="sort-asc">A-Z<input type="radio" name="sorting" id="sort-asc" value="asc" checked></label></li>
                <li><label for="sort-desc">Z-A<input type="radio" name="sorting" id="sort-desc" value="desc"></label></li>
            </ul>
        </section>
    </section>
    <ul class="lvl list-project" id="project-list">
        <!-- Project list will be updated here -->
    </ul>
</main><?php
    }));
}
