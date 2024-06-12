<?php
if ($argc != 2) {
    exit("Usage: {$argv[0]} <page name without extension>" . PHP_EOL);
}

define('THIS_PAGE_NAME', $argv[1]);

function get_page_link(string $pageName): string
{
    return $pageName == THIS_PAGE_NAME . '.html' ? "#" : $pageName;
}

function die_error(string $msg): never
{
    global $argv;
    exit("{$argv[0]}: error: $msg" . PHP_EOL);
}

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
                die_error("invalid SVG structure (no viewBox, no width or height): " . $svgCode);
            }
            $svgElement->setAttribute("viewBox", "0 0 $width $height");
        }

        $svgElement->removeAttribute('width');
        $svgElement->setAttribute('height', BASE_HEIGHT);

        return $domDocument->saveXML($svgElement);
    } else {
        die_error("invalid SVG structure (!= 1 <svg> elements): " . $svgCode);
    }
}

/**
 * Expand a glob to a single filename in the website folder. Exit with an error no or if multiple exist.
 */
function glob_website_filename(string $glob): string
{
    $glob = __DIR__ . "/../../portfolio/$glob";
    $g = glob($glob);
    if (count($g) != 1) {
        die_error("glob '$glob' matched " . count($g) . ' filename(s). Expected 1');
    }
    return realpath($g[0]);
}

/**
 * Expand a glob to a single filename in the website folder. Exit with an error if multiple exist. Null is returned if nothing is found.
 */
function glob_website_filename_optional(string $glob): string|null
{
    $glob = __DIR__ . "/../../portfolio/$glob";
    // /home/raphael/Documents/Programmation/Projets/portfolio/main/scripts/../../portfolio/img/definition/markdown/logo.svg
    // /home/raphael/Documents/Programmation/Projets/portfolio/portfolio/img/definition/markdown/logo.svg
    $g = glob($glob);
    if (count($g) == 0) {
        return null;
    }
    if (count($g) > 1) {
        die_error("glob '$glob' matched " . count($g) . ' filename(s). Expected 0 or 1');
    }
    return realpath($g[0]);
}

function remove_common_prefix($path1, $path2)
{
    // Find the common prefix
    $prefix = '';
    $length = min(strlen($path1), strlen($path2));
    for ($i = 0; $i < $length; $i++) {
        if ($path1[$i] === $path2[$i]) {
            $prefix .= $path1[$i];
        } else {
            break;
        }
    }

    // Remove the common prefix from the second path
    $newPath = str_replace($prefix, '', $path2);

    return $newPath;
}

/**
 * Get the website path to use to reference a file in the website folder.
 */
function get_website_path(string $fsFilename): string
{
    $fsFilename = realpath($fsFilename);

    // remove common prefix between __DIR__ and $fsFilename

    $s1 = __DIR__;
    $s2 = $fsFilename;
    if ($s1 < $s2) {
        [$s1, $s2] = [$s2, $s1];
    }

    $len = min(strlen($s1), strlen($s2));

    // While we still have string to compare,
    // if the indexed character is the same in both strings,
    // increment the index. 
    for ($i = 0; $i < $len && $s1[$i] == $s2[$i]; $i++)
        ;

    return '/'.substr($fsFilename, $i);

}