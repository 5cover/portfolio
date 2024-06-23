<?php
require_once 'content.php';
require_once 'help.php';
[$lang, $page] = parse_args();
?>
<?php put_doctype_html($page, $lang) ?>
<?php put_head($page, $lang) ?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <datalist id="project-titles">
            <!-- Fill this up dynamically -->
        </datalist>
        <section id="search-bar">
            <h2><?php echo $lang->get('projectSearchSearch') ?></h2>
            <input type="search" id="search-input" placeholder="<?php echo $lang->get('projectSearchPlaceholder') ?>"
                autocomplete="on" list="project-titles">
            <h3><?php echo $lang->get('projectSearchTags') ?></h3>
            <div class="list-rect" id="list-tag">
                <!-- Tags will be added here -->
            </div>
            <h3><?php echo $lang->get('projectSearchSort') ?></h3>
            <div class="list-rect" id="list-sorting">
                <label for="sort-asc">A-Z<input type="radio" name="sorting" id="sort-asc" value="asc" checked></label>
                <label for="sort-desc">Z-A<input type="radio" name="sorting" id="sort-desc" value="desc"></label>
            </div>
        </section>
        <ul class="list-project" id="project-list">
            <!-- Project list will be updated here -->
        </ul>
    </main>
    <?php put_footer($page, $lang) ?>
    <?php put_scripts($page) ?>
</body>

</html>