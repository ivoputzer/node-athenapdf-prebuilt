const {ok, equal} = require('assert')
    , {v4} = require('node-uuid')
    , {join} = require('path')
    , {execSync} = require('child_process')
    , {tmpdir, EOL} = require('os')
    , {lstatSync} = require('fs')

describe('as a developer', function(){
  let {env:{npm_package_name, npm_package_version}} = process

  describe('i want to install `athenapdf-prebuilt` from npm', () => {
    it('installs the repo locally', () => {
      // console.log(`mkdir -p test_modules`)
      // console.log(`npm install --prefix test_modules ${npm_package_name}-${npm_package_version}.tgz`)
    })
    it('it has an executable within `node_modules/.bin/athenapdf`')
  })
})
