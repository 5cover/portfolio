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

# shellcheck disable=SC2043
# todo: add lang 'en' once translations are finished
for lang in fr; do
    # Simple page
    for page in definitions-test index projects but-informatique history passions perspectives; do
        generate "$outdir/$lang/$page.html" "$lang" "$page" "$page.php"
    done

    # Project pages
    projects="$data_dir/$lang/projects.json"
    for id in $(jq -r 'keys[]' "$projects"); do
        generate "$outdir/$lang/project/$id.html" "$lang" "project/$id" project.php "$(jq -r ".\"$id\"" "$projects")"
    done
done