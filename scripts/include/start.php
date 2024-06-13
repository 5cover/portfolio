<?php
if ($argc != 2) {
    exit("Usage: {$argv[0]} <page name without extension>" . PHP_EOL);
}

define('THIS_PAGE_NAME', $argv[1]);

/**
 * Get the value of the `href` attribute to use for anchors in the navbar.
 * @param string $pageName The name of the page the anchor leads to.
 * @return string *pageName*, unless it is the current page, then `#`.
 */
function get_page_href(string $pageName): string
{
    return $pageName == THIS_PAGE_NAME . '.html' ? "#" : $pageName;
}

$_dir_stack = [];

/**
 * Push the directory stack.
 * Must be called once at the start of every script that uses relative paths.
 */
function pushd(string $dir): void
{
    global $_dir_stack;
    array_push($_dir_stack, $dir);
    chdir($dir) or throw new Exception('chdir failed');
}

/**
 * Push the directory stack.
 * Must be called once at the end of every script that uses relative paths.
 */
function popd(): void
{
    global $_dir_stack;
    chdir(array_pop($_dir_stack)) or throw new Exception('chdir failed');
}

function get_img_element(string $srcWebGlob, string|null $title = null, string|null $class = null, int $baseHeight = 30): string
{
    $srcFilename = glob_web_filename_single($srcWebGlob);
    if (str_ends_with($srcFilename, '.svg')) {
        $sizePart = "height=\"$baseHeight\"";
    } else {
        $size = getimagesize($srcFilename);
        if ($size === false) {
            throw new Exception('getimagesize failed');
        }
        $sizePart = $size[3];
    }

    $titlePart = $title === null ? '' : " title=\"$title\"";
    $classPart = $class === null ? '' : " class=\"$class\"";
    return "<img src=\"" . get_web_path($srcFilename) . "\" alt=\"$title\"$titlePart$classPart $sizePart loading=\"lazy\">";
}

function get_svg_element(string $svgWebGlob, string|null $title = null, string|null $class = null, int $baseHeight = 30): string
{
    $filename = glob_web_filename_single($svgWebGlob);
    // Create a DOMDocument instance
    $domDocument = new DOMDocument();

    // Suppress warnings when loading XML
    libxml_use_internal_errors(true);

    // Load the SVG code as XML
    $domDocument->load($filename) or throw new Exception("failed to load DOMDocument at '$filename'");

    // Clear libxml error buffer
    libxml_clear_errors();

    // Restore the default libxml error handling
    libxml_use_internal_errors(false);

    // Extract the <svg> element
    $svgElements = $domDocument->getElementsByTagName('svg');
    if ($svgElements->length == 1) {
        $svgElement = $svgElements->item(0);
        if (!$svgElement->getAttribute('viewBox')) {
            $width = $svgElement->getAttribute('width');
            $height = $svgElement->getAttribute('height');
            if (!$width || !$height) {
                throw new Exception("invalid SVG structure (no viewBox, no width or height) at '$filename'");
            }
            $svgElement->setAttribute("viewBox", "0 0 $width $height");
        }

        $svgElement->removeAttribute('width');
        $svgElement->setAttribute('height', $baseHeight);

        if ($title !== null) {
            $svgElement->setAttribute('title', $title);
        }
        if ($class !== null) {
            $svgElement->setAttribute('class', $class);
        }

        return $domDocument->saveXML($svgElement);
    } else {
        throw new Exception("invalid SVG structure (!= 1 <svg> elements) art '$filename'");
    }
}

/**
 * Get the HTML element to use to represent an icon.
 * @param array|null $info The icon info record.
 * @param string $webGlob A glob relative to the website folder. Must match a single filename: the image file
 * @param string|null $title The title of the icon (also set as the `img` `alt` attribute). `null` for no title.
 * @param string|null $class The value of the `class` attribute on the generated element. `null` for no `class` attribute.
 * @param int $baseHeight The default height of the element if it doesn't have an intrinsic one.
 * @return string|null An HTML element or `null` if *info* was `null`.
 */
function get_icon_element(array|null $info, string $webGlob, string|null $title = null, string|null $class = null, int $baseHeight = 30): string|null
{
    if ($info === null) {
        return null;
    }

    return ($info['isThemedSvg'] ? get_svg_element(...) : get_img_element(...))(
        $webGlob,
        $title,
        $class,
        $baseHeight
    );
}

/**
 * Decode a data JSON file.
 * @param string $path the path of the JSON file, relative to the data directory.
 * @return array The decoded JSON, in associative mode.
 */
function get_data_json(string $path): array
{
    $f = file_get_contents(__DIR__ . "/../../data/$path");
    if ($f === false) {
        throw new Exception("failed to open JSON data '$path'");
    }
    return json_decode($f, true);
}

/**
 * Expand a glob to filenames in the website folder.
 * @param string $glob A glob relative to the website folder.
 * @return array The filenames *glob* matched in the website folder.
 */
function glob_web_filename(string $glob): array
{
    $g = glob(__DIR__ . "/../../../portfolio/$glob");
    if ($g === false) {
        throw new Exception('glob failed');
    }
    return $g;
}


/**
 * Expand a glob to a single filename in the website folder. Exit with an error no or if multiple exist.
 * @param string $glob A glob relative to the website folder.
 * @return string The canonicalized path represented by *glob*.
 */
function glob_web_filename_single(string $glob): string
{
    $g = glob_web_filename($glob);
    if (count($g) != 1) {
        throw new Exception("glob '$glob' matched " . count($g) . ' filename(s). Expected 1');
    }
    return realpath($g[0]);
}

/**
 * Expand a glob to a single filename in the website folder. Exit with an error if multiple exist.
 * @param string $glob A glob relative to the website folder.
 * @return string The expand glob or `null` if it matched nothing.
 */
function glob_web_filename_optional(string $glob): string|null
{
    $g = glob_web_filename($glob);
    if (count($g) == 0) {
        return null;
    }
    if (count($g) > 1) {
        throw new Exception("glob '$glob' matched " . count($g) . ' filename(s). Expected 0 or 1');
    }
    return realpath($g[0]);
}

/**
 * Get the website path to use to reference a file in the website folder.
 * @param string $glob A filesystem filename.
 * @return string A path suitable for use as an HTML `href`.
 */
function get_web_path(string $fsFilename): string
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

    return '/' . substr($fsFilename, $i);

}