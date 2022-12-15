#!/usr/bin/env bash

set -e
set -o pipefail

if [ -d font-build ]; then rm -rf font-build; fi
mkdir -p font-build

pnpm run extract-font-svg

fontforge -script font-build/fontforge_import.pe

cp font-build/LCD1602.woff2 src/assets/