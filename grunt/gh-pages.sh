#!/bin/bash

#
# This script copies docs to gh-pages branch
echo "> Copy contents of docs to gh-pages branch"

export PLUGIN_ROOT=$( pwd )
echo "PLUGIN_ROOT nastaveno na $PLUGIN_ROOT"

git subtree push --prefix docs origin gh-pages

echo "Finished"
exit 0
