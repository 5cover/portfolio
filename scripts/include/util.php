<?php
require_once 'lang.php';
require_once 'page.php';

function for_get_prop_not_found(string $name): Exception
{
    return new Exception("property $name does not exist");
}

function wp_is_stream(string $path): bool
{
    $scheme_separator = strpos($path, '://');

    if (false === $scheme_separator) {
        // $path isn't a stream.
        return false;
    }

    $stream = substr($path, 0, $scheme_separator);

    return in_array($stream, stream_get_wrappers(), true);
}

function wp_mkdir_p(string $target): bool
{
    $wrapper = null;

    // Strip the protocol.
    if (wp_is_stream($target)) {
        list($wrapper, $target) = explode('://', $target, 2);
    }

    // From php.net/mkdir user contributed notes.
    $target = str_replace('//', '/', $target);

    // Put the wrapper back on the target.
    if (null !== $wrapper) {
        $target = $wrapper . '://' . $target;
    }

    /*
     * Safe mode fails with a trailing slash under certain PHP versions.
     * Use rtrim() instead of untrailingslashit to avoid formatting.php dependency.
     */
    $target = rtrim($target, '/');
    if (empty($target)) {
        $target = '/';
    }

    if (file_exists($target)) {
        return @is_dir($target);
    }

    // Do not allow path traversals.
    if (str_contains($target, '../') || str_contains($target, '..' . DIRECTORY_SEPARATOR)) {
        return false;
    }

    // We need to find the permissions of the parent folder that exists and inherit that.
    $target_parent = dirname($target);
    while ('.' !== $target_parent && !is_dir($target_parent) && dirname($target_parent) !== $target_parent) {
        $target_parent = dirname($target_parent);
    }

    // Get the permission bits.
    $stat = @stat($target_parent);
    if ($stat) {
        $dir_perms = $stat['mode'] & 07777;
    } else {
        $dir_perms = 0777;
    }

    if (@mkdir($target, $dir_perms, true)) {
        /*
         * If a umask is set that modifies $dir_perms, we'll have to re-set
         * the $dir_perms correctly with chmod()
         */
        if (($dir_perms & ~umask()) !== $dir_perms) {
            $folder_parts = explode('/', substr($target, strlen($target_parent) + 1));
            for ($i = 1, $c = count($folder_parts); $i <= $c; $i++) {
                chmod($target_parent . '/' . implode('/', array_slice($folder_parts, 0, $i)), $dir_perms);
            }
        }

        return true;
    }

    return false;
}

/**
 * Applies a transformation function to the given data.
 *
 * @template T
 * @template U
 * @param callable(T): U $transform The transformation function to apply.
 * @param ?T $data The data to be transformed.
 * @return ?U The transformed data.
 */
function map(callable $transform, mixed $data): mixed
{
    return $data === null ? null : $transform($data);
}

/**
 * Applies a callback function to the values of an array and returns a new array with the transformed values.
 *
 * @template TKey
 * @template TVal
 * @template TRes
 * @param callable(TKey, TVal): TRes $transform The callback function to apply to each value in the array.
 * @param array<TKey, TVal> $array The array to transform.
 * @return array<int, TRes> The new array with the transformed values.
 */
function array_map_entries(callable $transform, array $array): array
{
    return array_map($transform, array_keys($array), $array);
}

/**
 * Creates an HTML element with the specified tag name, content, and attributes.
 *
 * @param string $tagName The tag name of the element.
 * @param string $content The content of the element.
 * @param array<string, string> $attributes An optional array of attributes to be added to the element.
 * @return string The serialized representation of the created element.
 */
function element(string $tagName, string $content, array $attributes = []): string
{
    $d = new DOMDocument();
    $elem = notfalse($d->createElement($tagName), 'createElement');
    setInnerHTML($elem, $content);
    foreach ($attributes as $name => $value) {
        $elem->setAttribute($name, $value);
    }
    notfalse($d->appendChild($elem), 'append child');  // necessary so C14N returns something
    return $elem->C14N();
}

function parse_date(string $date): DateTimeImmutable
{
    return notfalse(
        DateTimeImmutable::createFromFormat('Y-m-d', $date),
        "DateTimeImmutable::createFromFormat on '$date'"
    );
}

/**
 * Asserts that something is not false.
 * @template T
 * @param T|false $value Value, possibly false
 * @param string $msg Assertion message
 * @return T Result, not false.
 */
function notfalse(mixed $value, string $msg): mixed
{
    assert($value !== false, "$msg failed");
    return $value;
}

/**
 * @template T
 * Asserts that something is not null.
 * @param ?T $value Value, possibly null
 * @param string $thing The thing that we're checking
 * @return T Result, not null.
 */
function notnull(mixed $value, string $thing): mixed
{
    assert($value !== null, "$thing is null");
    return $value;
}

function get_img_element(string $url, ?string $title = null, ?string $class = null, int $baseHeight = 30): string
{
    if (str_ends_with($url, '.svg')) {
        $sizePart = "height=\"$baseHeight\"";
    } else {
        $size = notfalse(getimagesize(root_path($url)), 'getimagesize');
        $sizePart = $size[3];
    }

    $titlePart = $title === null ? '' : " title=\"$title\"";
    $classPart = $class === null ? '' : " class=\"$class\"";
    return <<<HTML
<img src="$url" alt="$title"$titlePart$classPart $sizePart loading="lazy">
HTML;
}

function get_svg_element(string $url, ?string $title = null, ?string $class = null, int $baseHeight = 30): string
{
    // Create a DOMDocument instance
    $domDocument = new DOMDocument();

    // Load the SVG code as XML
    notfalse($domDocument->load(root_path($url)), "loading DOMDocument at '$url'");

    // Extract the <svg> element
    $svgElements = $domDocument->getElementsByTagName('svg');
    if ($svgElements->length == 1) {
        $svgElement = $svgElements->item(0);
        assert($svgElement instanceof DOMElement, 'Expected retrieved element to be a DOMElement');
        if (!$svgElement->getAttribute('viewBox')) {
            $width = $svgElement->getAttribute('width');
            $height = $svgElement->getAttribute('height');
            if (!$width || !$height) {
                throw new Exception("invalid SVG structure (no viewBox, no width or height) at '$url'");
            }
            $svgElement->setAttribute('viewBox', "0 0 $width $height");
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
 * @param string $filename The filename of the image
 * @param ?string $title The title of the icon (also set as the `img` `alt` attribute). `null` for no title.
 * @param ?string $class The value of the `class` attribute on the generated element. `null` for no `class` attribute.
 * @param int $baseHeight The default height of the element if it doesn't have an intrinsic one.
 * @return ?string An HTML element or `null` if *info* was `null`.
 */
function get_graphic_element(bool $isThemedSvg, string $url, ?string $title = null, ?string $class = null, int $baseHeight = 30): string
{
    return $isThemedSvg ? get_svg_element(
        $url,
        $title,
        $class,
        $baseHeight
    ) : get_img_element(
        $url,
        $title,
        $class,
        $baseHeight
    );
}

/**
 * Expand a glob to filename in the website folder.
 * @param string $glob A glob relative to the website folder.
 * @return string[] The filenames *glob* matched in the website folder.
 */
function glob_web(string $glob): array
{
    return notfalse(glob(root_path('portfolio/') . $glob), 'glob');
}

/**
 * Expand a glob to a single filename in the website folder. Exit with an error no or if multiple exist.
 * @param string $glob A glob relative to the website folder.
 * @return string The canonicalized filenames represented by *glob*.
 */
function glob_web_single(string $glob): string
{
    $g = glob_web($glob);
    if (count($g) != 1) {
        throw new Exception("glob '$glob' matched " . count($g) . ' filename(s). Expected 1');
    }
    return notfalse(realpath($g[0]), 'realpath');
}

/**
 * Expand a glob to a single filename in the website folder. Exit with an error if multiple exist.
 * @param string $glob A glob relative to the website folder.
 * @return ?string The expand filenames or `null` if it matched nothing.
 */
function glob_web_optional(string $glob): ?string
{
    $g = glob_web($glob);
    if (count($g) == 0) {
        return null;
    }
    if (count($g) > 1) {
        throw new Exception("glob '$glob' matched " . count($g) . ' filename(s). Expected 0 or 1');
    }
    return notfalse(realpath($g[0]), 'realpath');
}

/**
 * Get the URL to use to reference a file in the website folder.
 * @param string $glob A filesystem filename.
 * @return string An URL suitable for use as an HTML `href`, CSS `url()`...
 */
function get_web_url(string $filename): string
{
    $filename = notfalse(realpath($filename), 'realpath');

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
    for ($i = 0; $i < $len && $s1[$i] == $s2[$i]; $i++);

    return '/' . substr($filename, $i);
}

/**
 * Resolves a path relative to the website root directory.
 * @param string $rest A path relative to the website root directory.
 * @return string $rest, as an absolute path in the website root directory (with trailing slash)
 */
function root_path(string $rest): string
{
    return notfalse(realpath(__DIR__ . '/../../..'), 'realpath') . '/' . $rest;
}

/**
 * Set the inner HTML of a DOMElement.
 * @param DOMElement $element the element
 * @param string $htm the new inner html
 */
function setInnerHTML(DOMElement $element, string $html)
{
    $fragment = notfalse(notnull($element->ownerDocument, 'element->ownerDocument')
                             ->createDocumentFragment(), 'createDocumentFragment');
    notfalse($fragment->appendXML($html), 'append html');
    while ($element->hasChildNodes()) {
        notfalse($element->removeChild(notnull($element->firstChild, 'element->firstChild')), 'remove child');
    }
    notfalse($element->appendChild($fragment), 'append child');
}
