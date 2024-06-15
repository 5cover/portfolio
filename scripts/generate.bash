#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

readonly outdir='../../portfolio'

# $1 : page name without extension (php of same name must exist)
generate() {
    >&2 echo -n "generating $1..."
    php -d include_path="$(pwd)/include" "$1.php" "$(basename $1)" > "$outdir/$1.html"
    >&2 echo ok
}


generate fr/definitions-test
generate fr/index
generate fr/projects

generate en/definitions-test

# Copy data files

cp -r ../data "$outdir"