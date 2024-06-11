<?php {
    $cwd = getcwd();
    if ($cwd === false || !str_ends_with($cwd, '/main')) {
        exit('error: cwd not in main');
    }

    define("BASE_HEIGHT", 30);

    function get_svg_element(string $svgCode): string
    {
        // Create a DOMDocument instance
        $domDocument = new DOMDocument();

        // Suppress warnings when loading XML
        libxml_use_internal_errors(true);

        // Load the SVG code as XML
        $domDocument->loadXML($svgCode);

        // Clear libxml error buffer
        libxml_clear_errors();

        // Restore the default libxml error handling
        libxml_use_internal_errors(false);

        // Extract the <svg> element
        $svgElements = $domDocument->getElementsByTagName('svg');
        if ($svgElements->length == 1) {
            $svgElement = $svgElements->item(0);

            if (!$svgElement->hasAttribute('viewBox')) {
                $width = $svgElement->getAttribute('width');
                $height = $svgElement->getAttribute('height');
                if (!$width || !$height) {
                    exit("Invalid SVG structure (no viewBox, no width or height): " . $svgCode);
                }
                $svgElement->setAttribute("viewBox", "0 0 $width $height");
            }

            $svgElement->removeAttribute('width');
            $svgElement->setAttribute('height', BASE_HEIGHT);

            return $domDocument->saveXML($svgElement);
        } else {
            exit("Invalid SVG structure: " . $svgCode);
        }
    }

} ?>
<!DOCTYPE html>
<html lang="fr">
<?php echo file_get_contents('fragments/head.html'); ?>

<body>
    <?php echo file_get_contents('fragments/fr/header.html'); ?>
    <main>
        <dl>
            <?php
            $data = json_decode(file_get_contents('data/definitions.fr.json'), true);
            $types = json_decode(file_get_contents('data/types.fr.json'), true);
            foreach ($data as $id => $def) {
                $title = $def['names'][0];
                $indir = "../portfolio/img/definition/$id/";
                $outdir = ltrim($indir, '.');
                $g = glob("$indir/bg*");
                $bg = sizeof($g) == 1 ? basename($g[0]) : (sizeof($g) == 0 ? null : exit("$id: multiple bgs"));
                ?>
                <dt id="<?php echo $id ?>"><?php echo $id ?></dt>
                <dd>
                    <?php echo implode(', ', array_splice($def['names'], 1)) ?>
                    <div>
                        <a target="_blank" href="<?php echo $def['wiki'] ?>"
                            class="definition-tooltip-trigger"><?php echo $title; ?></a>
                        <div class="definition-tooltip" <?php if ($bg) {
                            echo "style=\"--bg-img: url($outdir$bg)\"";
                        } ?>>
                            <h4><?php echo $title; ?></h4>
                            <?php
                            if (array_key_exists('logo', $def)) {
                                $g = glob("$indir/logo*");
                                $logo = sizeof($g) == 1 ? basename($g[0]) : exit("$id: Logo found found or multiple logos");
                                if ($def['logo']['isThemedSvg']) {
                                    echo get_svg_element(file_get_contents($indir . $logo));
                                } else {
                                    echo "<img src=\"$outdir$logo\" height=" . BASE_HEIGHT . " alt=\"$title logo\">";
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
    <?php echo file_get_contents('fragments/fr/footer.html'); ?>
</body>
<?php echo file_get_contents('fragments/scripts.html'); ?>

</html>