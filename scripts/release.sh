#!/usr/bin/env bash
set -e

# 1. Check build
yarn build

# 2. Update package version
# NOTE: We don't commit and tag since we want to create the tag/commit after we generated the changelog.
# https://docs.npmjs.com/cli/version
VERSION_NAME=$(npm --no-git-tag-version version $1)
VERSION=${VERSION_NAME//[v]/}

# 3. Generate changelog
conventional-changelog -p angular -i CHANGELOG.md -s -r 0

# 4. Commit & tag
# 4.1 Commit package.json and CHANGELOG.md
# 4.2 Create a tag with version
git add package.json CHANGELOG.md
COMMIT_MESSAGE="Release ${VERSION}"
git commit -m "${COMMIT_MESSAGE}"
# Get last commit SHA (https://stackoverflow.com/a/949391/1092007)
COMMIT_SHA=$(git rev-parse --verify HEAD)
git tag -a ${VERSION_NAME} ${COMMIT_SHA} \
    -m "${COMMIT_MESSAGE}"

# 5. Push
git push --follow-tags
