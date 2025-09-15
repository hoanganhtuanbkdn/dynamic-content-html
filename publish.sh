#!/bin/bash

# Publish script for dynamic-content-html library

echo "🚀 Publishing dynamic-content-html library to npm..."

# Check if user is logged in to npm
if ! npm whoami &> /dev/null; then
    echo "❌ Please login to npm first: npm login"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix them before publishing."
    exit 1
fi

# Build the library
echo "🔨 Building library..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix build errors."
    exit 1
fi

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found. Build might have failed."
    exit 1
fi

# Publish to npm
echo "📦 Publishing to npm..."
npm publish

if [ $? -eq 0 ]; then
    echo "✅ Successfully published dynamic-content-html to npm!"
    echo "📦 Package: https://www.npmjs.com/package/dynamic-content-html"
else
    echo "❌ Failed to publish to npm."
    exit 1
fi
