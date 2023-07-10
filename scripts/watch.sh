#!/bin/bash

rm -rf build

    # --external:@emotion/* \
esbuild src/index.tsx \
    --external:react \
    --external:react-router-dom \
    --external:@mui/material \
    --external:@mui/icons-material \
    --bundle \
    --sourcemap \
    --platform=browser \
    --outdir=build \
    --format=esm \
    --watch
