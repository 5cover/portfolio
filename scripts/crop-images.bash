#!/usr/bin/env bash

set -euo pipefail

if [ "$(basename $(pwd))" != 'main' ]; then
    >&2 echo "$0: error: invoke from main dir"
    exit 1
fi

for f in bash c cpp csharp css csv html java javascript json markdown pascal php powershell python sass scheme sql svg wpf xml zig; do
    pushd "../portfolio/img/definition/$f"
    if ! [ -e "bg.png" ]; then
        >&2 echo "$0: error: $f doesnt have bg"
        exit 1
    fi
    #cp bg.png gb;
    #mogrify -crop 1759x984+144+70 bg.png
    popd
done