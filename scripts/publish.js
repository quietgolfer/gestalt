#!/usr/bin/env node
/* eslint import/no-dynamic-require: 0 */
const path = require('path');
const shell = require('shelljs');

const json = require(path.join(process.cwd(), 'package.json'));
const version = json.version;
console.log('publishing version ', version);

shell.exec('npm publish');
shell.exec(`git tag v${version}`);
shell.exec(`git push upstream v${version}`);
shell.exec('./scripts/ghpages.sh');
