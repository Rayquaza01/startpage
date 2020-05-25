#!/bin/bash
while getopts "ajhs" opt
do
    case "$opt"
    in
        a ) ALL=1;;
        j ) JS=1;;
        h ) HTML=1;;
        s ) ASSETS=1;;
    esac
done

if [ "$ALL" ] || [ "$JS" ]
then
    echo "Building JS"
    npx webpack --config webpack.dev.config.js
fi

if [ "$ALL" ] || [ "$HTML" ]
then
    echo "Building HTML"
    haml ./src/index.haml dist/index.html
fi

if [ "$ALL" ] || [ "$ASSETS" ]
then
    echo "Copying assets"
    cp -ar ./src/assets/. ./dist/
fi
