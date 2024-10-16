#!/usr/bin/env bash

# $1: optional - langs (can be whitespace-separated list of langs or * for all langs)
# $2: optional - type (page or detail)
# $3: optional - page name or detail kind (e.g., project, perspective, passion)
# $4: optional - detail id (only if $3 is a detail type). If absent, generate all details

set -euo pipefail
shopt -s globstar
cd "$(dirname "${BASH_SOURCE[0]}")"

readonly outdir='../../portfolio' \
    data_dir='../../portfolio/data/' \
    langs=(fr en) \
    detail_kinds=(project perspective passion) \
    pages=(definitions-test index but-informatique history projects passions perspectives)

# check if an array contains a value
# $1: value
# $@:2: array
array_contains() {
  local word=$1
  shift
  for e in "$@"; do [[ "$e" == "$word" ]] && return 0; done
  return 1
}

# print usage to stderr and exit.
# $1: exit code
exit_usage() {
    echo >&2 "Usage: $0 [lang] [type] [page_or_detail] [detail_id]"
    exit "$1"
}

# print error message to stderr and exit.
# $@: message
exit_error() {
    echo >&2 "$0: error:" "$@"
    exit 1
}

# log message to stderr
# $@: message
log() {
    echo >&2 -n "$@"
}

# log message to stderr, append newline
# $@: message
logln() {
    echo >&2 "$@"
}

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
    logln "generate $1 $2 $3 $4"
    local dest="$1" lang="$2" page="$3" phpf="$4"
    shift 4
    mkdir -p "$(dirname "$dest")"
    php >"$dest" -c php.ini -f "$phpf" -- "$lang" "$page" "$@"
}

# get detail JSON filename
# $1: lang
# $2: detail kind
detail_json_filename() {
    echo "$data_dir/$1/${2}s.json"
}

# generate detail page
# $1: lang
# $2: detail kind
# $3: detail id
generate_detail() {
    log "generate detail $1 $2 $3 - "
    generate "$outdir/$1/$2/$3.html" "$1" "$2/$3" "$2.php" "$(jq -r ".\"$3\"" "$(detail_json_filename "$1" "$2")")"
}   

# generate detail pages
# $1: lang
# $2: detail kind
generate_details() {
    for id in $(jq -r 'keys[]' "$(detail_json_filename "$1" "$2")"); do
        generate_detail "$1" "$2" "$id"
    done
}

# generate regular page
# $1: lang
# $2: page name
generate_page() {
    log "generate page $1 $2 - "
    generate "$outdir/$1/$2.html" "$1" "$2" "$2.php"
}

# Use only for debugging! Keep commented otherwise. Pushing a phpinfo page is.. eh.
#generate_page '' phpinfo; exit

if [[ $# -eq 1 && "$1" = '--help' ]]; then
    exit_usage 0
fi

# link data JSONs
link() {
    log "linking... "
    ./linker.py "$data_dir" ../data/**/*.json
    logln ok
}

if [[ $# -eq 0 ]]; then
    link
    # generate root index page
    generate "$outdir/index.html" '' root-index root-index.php

    for lang in "${langs[@]}"; do
        # Simple page
        for page in "${pages[@]}"; do
            generate_page "$lang" "$page"
        done

        for kind in "${detail_kinds[@]}"; do
            generate_details "$lang" "$kind"
        done
    done
else
    arg_langs="${1:-}" arg_type="${2:-}" arg_page="${3:-}" arg_detail_id="${4:-}"

    if [[ -z "$arg_langs" || -z "$arg_type" || -z "$arg_page" ]]; then
        exit_usage 1
    fi

    if [[ "$arg_langs" = '*' ]]; then
        arg_langs="${langs[*]}"
    fi

    for l in $arg_langs; do
        if ! array_contains "$l" "${langs[@]}"; then
            exit_error "Invalid language '$l'. Use one of: ${langs[*]}"
        fi
    done

    case $arg_type in
    page)
        if ! array_contains "$arg_page" "${pages[@]}"; then
            exit_error "Invalid page name '$arg_page'. Use one of: ${pages[*]}"
        fi
        link
        
        for l in $arg_langs; do
            generate_page "$l" "$arg_page"
        done
        ;;
    detail)
        if ! array_contains "$arg_page" "${detail_kinds[@]}"; then
            exit_error "Invalid detail kind '$arg_page'. Use one of: ${detail_kinds[*]}"
        fi
        link

        if [[ -z "$arg_detail_id" ]]; then
            for l in $arg_langs; do
                generate_details "$l" "$arg_page"
            done;
        else
            for l in $arg_langs; do
                generate_detail "$l" "$arg_page" "$arg_detail_id"
            done;
        fi
        ;;
    *)
        exit_error "Invalid page kind. Use 'page' for regular pages or 'detail' for detail pages."
        ;;
    esac
fi
