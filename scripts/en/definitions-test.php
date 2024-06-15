<?php
require_once 'start.php';
pushd(__DIR__);
?>
<!DOCTYPE html>
<html lang="en">
<?php include '../head.php'; ?>

<body>
    <?php include 'header.php'; ?>
    <main>
        <dl>
            <?php
            $data = get_data_json('definitions.json');
            $synopsis = get_data_json('en/synopsis.json');
            $types = get_data_json('en/types.json');
            foreach ($data as $id => $def) {
                $title = $def['names'][0];
                ?>
                <dt id="<?php echo $id ?>"><?php echo $id ?></dt>
                <dd>
                    <?php echo implode(', ', array_splice($def['names'], 1)) ?>
                    <div>
                        <a target="_blank" href="<?php echo $def['wiki'] ?>"
                            class="link definition-tooltip-trigger"><?php echo $title; ?></a>
                        <div class="definition-tooltip" <?php if ($bg = $def['background'] ?? null) {
                            echo "style=\"--bg-img: url($bg)\"";
                        } ?>>
                            <h4><?php echo $title; ?></h4>
                            <?php if ($logo = $def['logo'] ?? null) {
                                echo get_icon_element($logo['isThemedSvg'], $logo['url'], "$title logo");
                            } ?>
                            <p><small><?php echo ucfirst($types[$def['type']]); ?></small></p>
                            <p><?php echo $synopsis[$id]; ?></p>
                        </div>
                    </div>
                </dd>
            <?php } ?>
        </dl>
    </main>
    <?php include 'footer.php'; ?>
    <?php include '../scripts.php'; ?>
</body>

</html>
<?php popd(); ?>