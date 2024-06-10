<?php {
    $cwd = getcwd();
    if ($cwd === false || !str_ends_with($cwd, '/main')) {
        error_log('error: cwd not in main');
        exit(0);
    }

    define("BASE_HEIGHT", 40);

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
                    error_log("Invalid SVG structure (no viewBox, no width or height): " . $svgCode);
                    exit;
                }
                $svgElement->setAttribute("viewBox", "0 0 $width $height");
            }

            $svgElement->removeAttribute('width');
            $svgElement->setAttribute('height', BASE_HEIGHT);

            return $domDocument->saveXML($svgElement);
        } else {
            error_log("Invalid SVG structure: " . $svgCode);
            exit;
        }
    }

} ?>
<!DOCTYPE html>
<html lang="en">
<?php echo file_get_contents('fragments/head.html'); ?>

<body>
    <?php echo file_get_contents('fragments/en/header.html'); ?>
    <main>
        <dl>
            <?php
            $data = json_decode(file_get_contents('data/definitions.en.json'), true);
            $types = json_decode(file_get_contents('data/types.en.json'), true);
            foreach ($data as $id => $def) {
                $title = $def['names'][0];
                ?>
                <dt id="<?php echo $id ?>"><?php echo $id ?></dt>
                <dd class="definition">
                    <p><?php echo implode(', ', array_splice($def['names'], 1)) ?> <span
                            class="definition-trigger"><?php echo $title; ?>
                        </span></p>
                    <article>
                        <h4><?php echo $title; ?></h4>
                        <?php
                        if (array_key_exists('logo', $def)) {
                            $filename = glob("../portfolio/img/definition/$id/logo*")[0];
                            if ($def['logo']['isThemedSvg']) {
                                echo get_svg_element(file_get_contents($filename));
                            } else {
                                echo "<img src=\"" . ltrim($filename, '.') . "\" height=" . BASE_HEIGHT . " alt=\"$title logo\">";
                            }
                        }
                        ?>
                        <p><small><?php echo ucfirst($types[$def['type']]); ?></small></p>
                        <p><?php echo $def['synopsis']; ?></p>
                        <p><a target="_blank" href="<?php echo $def['wiki'] ?>">More information</a></p>
                    </article>
                </dd>
                <?php
            }
            ?>
        </dl>
    </main>
    <?php echo file_get_contents('fragments/en/footer.html'); ?>
</body>
<?php echo file_get_contents('fragments/scripts.html'); ?>

</html>