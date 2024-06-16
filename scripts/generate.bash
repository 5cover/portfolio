#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

readonly outdir='../../portfolio'

# minify html
# stdin: html
# stdout: minified html
minify_html() {
    minhtml --minify-css --minify-js --do-not-minify-doctype --ensure-spec-compliant-unquoted-attribute-values
}

# generate html
# $1: destination filename
# $2: php file
# $3: lang
# $4: page name ($2.php must exist)
# $5.. args
# stdout: minified html
generate() {
    >&2 echo -n "generate $1 $2 $3 $4..."
    local dest="$1"
    local phpf="$2"
    local lang="$3"
    local page="$4"
    shift 4
    mkdir -p "$(dirname "$dest")"
     > "$dest" php -d include_path="$(pwd)/include" -f "$phpf" "$lang" "$page" "$@";
    >&2 echo ok
}

for lang in fr en; do
    # Simple page
    for page in definitions-test index projects; do
        generate "$outdir/$lang/$page.html" "$page.php" "$lang" "$page"
    done

    # Project pages
    projects="../data/$lang/projects.json"
    for id in $(jq -r 'keys[]' "$projects"); do
        generate "$outdir/$lang/project/$id.html" project.php "$lang" "$id" "$(jq -r ".\"$id\"" "$projects")"
    done
done

# Copy data files

cp -r ../data "$outdir"