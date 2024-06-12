<?php
chdir(__DIR__);
require_once ('../start.php');

define("BASE_HEIGHT", 30);
?>
<!DOCTYPE html>
<html lang="en">
<?php include '../head.php'; ?>

<body>
    <?php include 'header.php'; ?>
    <main>
        <dl>
            <?php
            $data = json_decode(file_get_contents('../../data/definitions.fr.json'), true);
            $types = json_decode(file_get_contents('../../data/types.fr.json'), true);
            foreach ($data as $id => $def) {
                $title = $def['names'][0];
                $indir = "img/definition/$id/";
                $bg = glob_website_filename_optional($indir . 'bg*');
                ?>
                <dt id="<?php echo $id ?>"><?php echo $id ?></dt>
                <dd>
                    <?php echo implode(', ', array_splice($def['names'], 1)) ?>
                    <div>
                        <a target="_blank" href="<?php echo $def['wiki'] ?>"
                            class="link definition-tooltip-trigger"><?php echo $title; ?></a>
                        <div class="definition-tooltip" <?php if ($bg) {
                            echo 'style="--bg-img: url(' . get_website_path($bg) . ')"';
                        } ?>>
                            <h4><?php echo $title; ?></h4>
                            <?php
                            if (array_key_exists('logo', $def)) {
                                $logo = glob_website_filename($indir . 'logo*');
                                if ($def['logo']['isThemedSvg']) {
                                    echo get_svg_element(file_get_contents($logo));
                                } else {
                                    echo '<img src="' . get_website_path($logo) . '" height=' . BASE_HEIGHT . " alt=\"$title logo\">";
                                }
                            }
                            ?>
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
</body>
<?php include '../scripts.php'; ?>

</html>