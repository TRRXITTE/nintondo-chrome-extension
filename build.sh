#!/bin/bash
set -euo pipefail

# Clean old build artifacts
rm -rf build

# Build and export Next.js
yarn next build
yarn next export

# Prepare Next assets
mv out/_next out/next
sed -i -e 's=/_next/=/next/=g' out/**.html

# Ensure build directories exist
mkdir -p build build/scripts build/next

# Move exported HTML into build/
mv out/*.html build

# Bundle extension scripts (webpack) into build/scripts
yarn build-scripts
rsync -va --delete-after scripts/compiled/ build/scripts/ || true
rm -rf scripts/compiled

# Copy Next assets
rsync -va --delete-after out/next/ build/next/

# Copy static assets and manifest
cp public/manifest.json build/manifest.json
rsync -va public/ build/

# Clean up export dir
rm -rf out

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  google-chrome http://reload.extensions
elif [[ "$OSTYPE" == "darwin"* ]]; then
  open -a "Google Chrome" http://reload.extensions
fi
