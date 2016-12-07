# Gestalt
[![Build status](https://badge.buildkite.com/2c6b6e9f79054095354cc061876e4885f4b9212e1dbebda270.svg?branch=master)](https://buildkite.com/pinterest/gestalt)

## Development

Install dependencies.
```
npm run bootstrap
```

Start the development server:
```
npm start
```
Visit [http://localhost:8080/](http://localhost:8080) and click on a component to view the docs.

## Releasing

The following outlines our release process:
* Make sure to add the new components you want to release to the index.js export list.
* Bump package versions using lerna: `npm run release:version`. This will prompt you for a version number.
* Open a pull request with the new versions and land that in master.
* Once the version is bumped in master, checkout that commit locally.
* Publish to NPM with `npm run release:publish`.
* Push the tag to the repository with `git push upstream v(NPM version)`.
* Draft a release from the tag and update the release notes at https://github.com/pinterest/gestalt/releases
* Publish a new set of docs if necessary with `./scripts/ghpages.sh`.
