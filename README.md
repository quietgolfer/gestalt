# Gestalt
[![Build Status](https://travis-ci.com/pinterest/gestalt.svg?token=yfARxv3oq7ZT3ZbmJWVN&branch=master)](https://travis-ci.com/pinterest/gestalt)

## Development

Install dependencies.
```
npm run bootstrap
```

Start the development server:
```
npm start
```
Visit [http://localhost:3000/](http://localhost:3000) and click on a component to view the docs.

## Releasing

The following outlines our release process:
* Make sure to add the new components you want to release to the index.js export list.
* Bump package versions using lerna: `./node_modules/.bin/lerna publish --skip-npm`. This will prompt you for a version number.
* Open a pull request with the new versions and land that in master.
* Once the version is bumped in master, checkout that commit locally.
* Publish to NPM with `lerna exec npm publish --registry http://sinopia.ec2.pin220.com:8080`.
* Tag the commit with `git tag v(NPM version)`.
* Push the tag to the repository with `git push upstream v(NPM version)`.
* Draft a release from the tag and update the release notes at https://github.com/pinterest/gestalt/releases
* Publish a new set of docs if necessary with `./scripts/ghpages.sh`.
