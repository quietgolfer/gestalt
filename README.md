# Gestalt
[![Build Status](https://travis-ci.com/pinterest/gestalt.svg?token=yfARxv3oq7ZT3ZbmJWVN&branch=master)](https://travis-ci.com/pinterest/gestalt)

## Development

Install dependencies.
```
npm i -g lerna
lerna bootstrap
```

Start the development server:
```
npm start
```
Visit http://localhost:3000/#/ and click on a component to get view the docs.

## Releasing

The following outlines our release process:
* Make sure to add the new components you want to release to the index.js export list.
* Bump the NPM package version, and land in master. This usually means opening up a pull request with a version change to package.json.
* Once the version is bumped in master, checkout that commit locally.
* Publish to NPM with `npm publish`.
* Tag the commit with `git tag v(NPM version)`.
* Push the tag to the respository with `git push upstream --tags`.
* Draft a release from the tag and update the release notes at https://github.com/pinterest/gestalt/releases
* Publish a new set of docs if necessary with `./scripts/ghpages.sh`.
