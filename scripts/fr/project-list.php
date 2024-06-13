<?php
require_once 'start.php';
pushd(__DIR__);
?>
<ul class="list-projects">
    <?php
    $data = get_data_json('fr/projects.json');
    $tags = get_data_json('fr/tags.json');
    $anchors = get_data_json('anchors.json');

    foreach ($data as $id => $project) {
        $indir = "img/project/$id/";

        $abstract = $project['abstract'];
        $context = $project['context'];
        $title = $project['title'];
        $startDate = $project['start-date'];

        ?>
        <li <?php if ($bgFile = glob_web_filename_optional($indir . 'bg*')) {
            echo 'style="--bg-img: url(' . get_web_path($bgFile) . ')"';
        } ?>>
            <ul class="list-tags">
                <?php foreach ($project['tags'] as $tagId) {
                    echo "<li><a href=\"projects.html?tag=$tagId\">{$tags[$tagId]}</a></li>";
                } ?>
            </ul>
            <?php echo get_icon_element($project['logo'] ?? null, $indir . 'logo*', "logo $title", 'logo'); ?>
            <h3><a href="project/<?php echo $id; ?>.html"><?php echo $title; ?></a></h3>
            <p class="context"><small><?php echo ucfirst($context); ?></small></p>
            <p class="status"><small><?php echo "$startDate \u{2013} " . ($project['end-date'] ?? 'en cours'); ?></small>
            </p>
            <p class="abstract"><?php echo $abstract; ?></p>
            <ul class="list-anchors">
                <?php foreach ($project['anchors'] as $name => $social) { ?>
                    <li>
                        <a href="<?php echo $social['href']; ?>" title="<?php echo $name; ?>" target="_blank">
                            <?php echo get_icon_element($anchors[$social['id']], "img/social/{$social['id']}*"); ?>
                        </a>
                    </li>
                <?php } ?>
            </ul>
        </li>
    <?php } ?>
</ul>
<?php popd(); ?>