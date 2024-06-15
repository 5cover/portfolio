<?php
require_once 'start.php';
pushd(__DIR__);
?>
<!DOCTYPE html>
<html lang="fr">
<?php include '../head.php'; ?>

<body>
    <?php include 'header.php'; ?>
    <main>
        <datalist id="project-titles">
            <!-- Fill this up dynamically -->
        </datalist>
        <aside id="search-bar">
            <h2>Rechercher un projet</h2>
            <input type="search" id="search-input" placeholder="Entrer un titre&hellip;" autocomplete="on"
                list="project-titles">
            <h3>Tags</h3>
            <div class="list-tag" id="list-tag">
                <!-- Tags will be added here -->
            </div>
            <h3>Trier par titre</h3>
            <div class="list-tag" id="list-sorting">
                <label for="sort-asc">A-Z<input type="radio" name="sorting" id="sort-asc" value="asc" checked></label>
                <label for="sort-desc">Z-A<input type="radio" name="sorting" id="sort-desc" value="desc"></label>
            </div>
        </aside>
        <ul class="list-projects" id="project-list">
            <!-- Project list will be updated here -->
        </ul>
    </main>
    <?php include 'footer.php'; ?>
    <?php include '../scripts.php'; ?>
</body>

</html>
<?php popd(); ?>