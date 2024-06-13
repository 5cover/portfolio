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
        <dl>
            <?php
            $data = get_data_json('fr/definitions.json');
            $types = get_data_json('fr/types.json');
            foreach ($data as $id => $def) {
                $title = $def['names'][0];
                $indir = "img/definition/$id/";
                ?>
                <dt id="<?php echo $id ?>"><?php echo $id ?></dt>
                <dd>
                    <?php echo implode(', ', array_splice($def['names'], 1)) ?>
                    <div>
                        <a target="_blank" href="<?php echo $def['wiki'] ?>"
                            class="link definition-tooltip-trigger"><?php echo $title; ?></a>
                        <div class="definition-tooltip" <?php if ($bgFile = glob_web_filename_optional($indir . 'bg*')) {
                            echo 'style="--bg-img: url(' . get_web_path($bgFile) . ')"';
                        } ?>>
                            <h4><?php echo $title; ?></h4>
                            <?php echo get_icon_element($def['logo'] ?? null, $indir . 'logo*', "logo $title"); ?>
                            <p><small><?php echo ucfirst($types[$def['type']]); ?></small></p>
                            <p><?php echo $def['synopsis']; ?></p>
                        </div>
                    </div>
                </dd>
                <?php
            }
            ?>
        </dl>
    </main>
    <?php include 'footer.php'; ?>
    <?php include '../scripts.php'; ?>
</body>

</html>
<?php popd(); ?>