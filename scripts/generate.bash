#!/usr/bin/env bash

set -eu
cd "$(dirname "${BASH_SOURCE[0]}")"

php -c php.ini -f generate.php
