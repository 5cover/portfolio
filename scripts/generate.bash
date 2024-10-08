#!/usr/bin/env bash

# [$1]: a page name, the single one to generate (for all langs). If unspecified, all pages are generated.

set -euo pipefail
shopt -s globstar
cd "$(dirname "${BASH_SOURCE[0]}")"

readonly outdir='../../portfolio' \
       data_dir='../../portfolio/data/'

if [[ $# -gt 1 ]]; then
    >&2 echo "Usage: $0 [page-name]"
    exit 1
fi

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
    local dest="$1" lang="$2" page="$3" phpf="$4"
    shift 4
    mkdir -p "$(dirname "$dest")"
    > "$dest" php -c php.ini -f "$phpf" "$lang" "$page" "$@";
    >&2 echo ok
}

# generate detail pages
# $1: lang
# $2: detail kind
generate_details() {
    >&2 echo generating "$2" details
    local details="$data_dir/$1/${2}s.json"
    for id in $(jq -r 'keys[]' "$details"); do
        generate "$outdir/$1/$2/$id.html" "$1" "$2/$id" "$2.php" "$(jq -r ".\"$id\"" "$details")"
    done
}

# generate regular page
# $1: lang
# $2: page name
generate_page() {
    generate "$outdir/$1/$2.html" "$1" "$2" "$2.php"
}

# link data JSONs
./linker.py "$data_dir" ../data/**/*.json

# todo: add english
readonly langs=(fr en)

# Use only for debugging! Keep commented otherwise. Pushing a phpinfo page is.. eh.
#generate_page '' phpinfo; exit

if [[ $# -eq 1 ]]; then
    for lang in "${langs[@]}"; do
    generate_page "$lang" "$1"
    done
else
    # generate root index page
    generate "$outdir/index.html" '' root-index root-index.php

    for lang in "${langs[@]}"; do
        # Simple page
        for page in definitions-test index but-informatique history projects passions perspectives; do
            generate_page "$lang" $page
        done

        for kind in project perspective passion; do
            generate_details "$lang" $kind
        done
    done
fi
