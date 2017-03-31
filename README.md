# Gestalt
[![Build status](https://badge.buildkite.com/2c6b6e9f79054095354cc061876e4885f4b9212e1dbebda270.svg?branch=master)](https://buildkite.com/pinterest/gestalt)
[![NPM Version](https://img.shields.io/npm/v/gestalt.svg)](https://www.npmjs.com/package/gestalt)

## Development

Install dependencies.
```
yarn
```

Start the development server:
```
yarn start
```
Visit [http://localhost:8080/](http://localhost:8080) and click on a component to view the docs.

## Releasing

The following outlines our release process:
* Checkout a new branch.
* Bump package version in `package.json`.
* Open a pull request with the new version and land that in master.
* Once the version is bumped in master, checkout that commit locally.
* Publish the tag, npm package, and docs with: `./scripts/publish.js`.
* Draft a release from the tag and update the release notes at https://github.com/pinterest/gestalt/releases
