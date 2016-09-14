# Gestalt
[![Build Status](https://travis-ci.com/pinterest/gestalt.svg?token=yfARxv3oq7ZT3ZbmJWVN&branch=master)](https://travis-ci.com/pinterest/gestalt)

## Development

Install dependencies.
```
npm install
```

Start the development server:
```
npm start
```
The documentation will automatically open in your default browser.

## Releasing

The following outlines our release process:

* Bump the NPM package version, and land in master. This usually means opening up a pull request with a version change to package.json.
* Once the version is bumped in master, checkout that commit locally.
* Publish to NPM with `npm publish`.
* Tag the commit with `git tag v(NPM version)`.
* Push the tag to the respository with `git push upstream --tags`.
* Draft a release from the tag and update the release notes at https://github.com/pinterest/gestalt/releases
* Publish a new set of docs if necessary with `./scripts/ghpages.sh`.
