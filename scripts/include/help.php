<?php
require_once 'lang.php';
require_once 'page.php';

function array_map_entries(callable $transform, array $array): array {
    return array_map($transform, array_keys($array), $array);
}

function element(string $tagName, string $content, array $attributes = []): string {
    $d = new DOMDocument();
    $elem = $d->createElement($tagName);
    setInnerHTML($elem, $content);
    foreach ($attributes as $name => $value) {
        $elem->setAttribute($name, $value);
    }
    expect($d->appendChild($elem), 'append child'); // necessary so C14N returns something
    return $elem->C14N();
}

function map(callable $transform, mixed $data): mixed {
    return $data === null ? null : $transform($data);
}

function parse_args(): array {
    global $argc, $argv;
    if ($argc < 3) {
        exit("Usage: {$argv[0]} <lang> <page name>" . PHP_EOL);
    }
    return [Lang::instances()[$argv[1]], new Page($argv[2])];
}

function _get_web_filename(string $url) {
    return __DIR__ . '/../../../' . $url;
}

function parse_date(string $date): DateTimeImmutable {
    return expect(DateTimeImmutable::createFromFormat('Y-m-d', $date),
        "DateTimeImmutable::createFromFormat on '$date'");
}

function expect(mixed $result, string $msg) {
    if ($result === false) {
        throw new Exception("$msg failed");
    }
    return $result;
}

function get_img_element(string $url, string|null $title = null, string|null $class = null, int $baseHeight = 30): string {
    if (str_ends_with($url, '.svg')) {
        $sizePart = <<<END
        height="$baseHeight"
        END;
    } else {
        $size = expect(getimagesize(_get_web_filename($url)), 'getimagesize');
        $sizePart = $size[3];
    }

    $titlePart = $title === null ? '' : " title=\"$title\"";
    $classPart = $class === null ? '' : " class=\"$class\"";
    return <<<HTML
    <img src="$url" alt="$title"$titlePart$classPart $sizePart loading="lazy">
    HTML;
}

function get_svg_element(string $url, string|null $title = null, string|null $class = null, int $baseHeight = 30): string {
    // Create a DOMDocument instance
    $domDocument = new DOMDocument();

    // Load the SVG code as XML
    expect($domDocument->load(_get_web_filename($url)), "loading DOMDocument at '$url'");

    // Extract the <svg> element
    $svgElements = $domDocument->getElementsByTagName('svg');
    if ($svgElements->length == 1) {
        $svgElement = $svgElements->item(0);
        if (!$svgElement->getAttribute('viewBox')) {
            $width = $svgElement->getAttribute('width');
            $height = $svgElement->getAttribute('height');
            if (!$width || !$height) {
                throw new Exception("invalid SVG structure (no viewBox, no width or height) at '$url'");
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
        throw new Exception("invalid SVG structure (!= 1 <svg> elements) art '$url'");
    }
}

/**
 * Get the HTML element to use for a graphic.
 * @param bool $isThemedSvg is it a themed SVG?
 * @param string $url The url of the image
 * @param string|null $title The title of the icon (also set as the `img` `alt` attribute). `null` for no title.
 * @param string|null $class The value of the `class` attribute on the generated element. `null` for no `class` attribute.
 * @param int $baseHeight The default height of the element if it doesn't have an intrinsic one.
 * @return string|null An HTML element or `null` if *info* was `null`.
 */
function get_graphic_element(bool $isThemedSvg, string $url, string|null $title = null, string|null $class = null, int $baseHeight = 30): string {
    return ($isThemedSvg ? get_svg_element(...) : get_img_element(...))(
        $url,
        $title,
        $class,
        $baseHeight
    );
}

$_dataJsonCache = [];

/**
 * Decode and cache a data JSON file.
 * @param string $name the filename of the JSON file, relative to the data directory, without the extension.
 * @return array The decoded JSON, in associative mode.
 */
function get_data_json(string $name, bool $linked = true): array {
    global $_dataJsonCache;
    return $_dataJsonCache[$name] ??= _get_data_json_fetch($name, $linked);
}

function _get_data_json_fetch(string $name, bool $linked): array {
    $f = expect(file_get_contents($linked
            ? _get_web_filename("/portfolio/data/$name.json")
            : __DIR__ . "/../../data/$name.json"),
        "opening JSON data '$name'");
    return json_decode($f, true);
}

/**
 * Expand a glob to filename in the website folder.
 * @param string $glob A glob relative to the website folder.
 * @return array The filenames *glob* matched in the website folder.
 */
function glob_web(string $glob): array {
    return expect(glob(_get_web_filename("$glob")), 'glob');
}


/**
 * Expand a glob to a single filename in the website folder. Exit with an error no or if multiple exist.
 * @param string $glob A glob relative to the website folder.
 * @return string The canonicalized filenames represented by *glob*.
 */
function glob_web_single(string $glob): string {
    $g = glob_web($glob);
    if (count($g) != 1) {
        throw new Exception("glob '$glob' matched " . count($g) . ' filename(s). Expected 1');
    }
    return expect(realpath($g[0]), 'realpath');
}

/**
 * Expand a glob to a single filename in the website folder. Exit with an error if multiple exist.
 * @param string $glob A glob relative to the website folder.
 * @return string The expand filenames or `null` if it matched nothing.
 */
function glob_web_optional(string $glob): string|null {
    $g = glob_web($glob);
    if (count($g) == 0) {
        return null;
    }
    if (count($g) > 1) {
        throw new Exception("glob '$glob' matched " . count($g) . ' filename(s). Expected 0 or 1');
    }
    return expect(realpath($g[0]), 'realpath');
}

/**
 * Get the URL to use to reference a file in the website folder.
 * @param string $glob A filesystem filename.
 * @return string An URL suitable for use as an HTML `href`, CSS `url()`...
 */
function get_web_url(string $filename): string {
    $filename = expect(realpath($filename), 'realpath');

    // remove common prefix between __DIR__ and filename
    $s1 = __DIR__;
    $s2 = $filename;
    if ($s1 < $s2) {
        [$s1, $s2] = [$s2, $s1];
    }

    $len = min(strlen($s1), strlen($s2));

    // While we still have string to compare,
    // if the indexed character is the same in both strings,
    // increment the index. 
    for ($i = 0; $i < $len && $s1[$i] == $s2[$i]; $i++)
        ;

    return '/' . substr($filename, $i);

}

function setInnerHTML(DOMElement $element, string $html)
{
    $fragment = $element->ownerDocument->createDocumentFragment();
    expect($fragment->appendXML($html), 'append html');
    while ($element->hasChildNodes()) {
        expect($element->removeChild($element->firstChild), 'remove child');
    }
    expect($element->appendChild($fragment), 'append child');
}