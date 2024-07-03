#!/usr/bin/env bash

set -euo pipefail
shopt -s globstar

cd "$(dirname "${BASH_SOURCE[0]}")"

readonly outdir='../../portfolio'
readonly data_dir='../../portfolio/data/'

# minify html
# stdin: html
# stdout: minified html
minify_html() {
    minhtml --minify-css --minify-js
}

# generate html
# $1: destination filename
# $2: lang
# $3: page name
# $4: php file
# $5.. args
# stdout: minified html
generate() {
    >&2 echo -n "generate $1 $2 $3 $4..."
    local dest="$1"
    local lang="$2"
    local page="$3"
    local phpf="$4"
    shift 4
    mkdir -p "$(dirname "$dest")"
     > "$dest" php -d include_path="include" -f "$phpf" "$lang" "$page" "$@";
    >&2 echo ok
}

# link data JSONs
./linker.py "$data_dir" ../data/**/*.json

# generate detail pages
# $1: lang
# $2: detail kind
generate_details() {
    >&2 echo generating $kind details
    local details="$data_dir/$1/${2}s.json"
    for id in $(jq -r 'keys[]' "$details"); do
        generate "$outdir/$1/$2/$id.html" "$1" "$2/$id" "$2.php" "$(jq -r ".\"$id\"" "$details")"
    done
}

# shellcheck disable=SC2043
# todo: add lang 'en' once translations are finished
for lang in fr; do
    # Simple page
    for page in definitions-test index but-informatique history projects passions perspectives; do
        generate "$outdir/$lang/$page.html" $lang "$page" "$page.php"
    done

    for kind in project perspective passion; do
        generate_details $lang $kind
    done
done