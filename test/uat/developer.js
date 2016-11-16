const {ok, equal} = require('assert')

const {execSync, spawnSync} = require('child_process')

const {join, dirname, resolve} = require('path')
const {unlink, rmdirSync, lstatSync, emptyDirSync, readJsonSync} = require('fs-extra')
const {tmpdir} = require('os')

describe(`as a developer`, function(){
  const {cwd, env:{npm_package_name, npm_package_repository_url}} = process

  describe(`i want to install the latest version of ${npm_package_name}`, function(){
    const npm_package_tgz = execSync(`npm pack`)
    const tgz_package = join(tmpdir(), npm_package_name, 'package.json')

    console.log('-- tmpdir', dirname(tgz_package))

    after(done => {
      const filename = resolve(npm_package_tgz.toString().trim())
      unlink(filename, done)
    })

    it(`deploys ${npm_package_name} to tmpdir`, () => {
      const filename = resolve(npm_package_tgz.toString().trim())

      emptyDirSync(dirname(tgz_package))
      execSync(`tar -xvz -s/package/${npm_package_name}/ -f ${filename} -C ${dirname(dirname(tgz_package))}`, {stdio: 'ignore'})

      equal(readJsonSync(tgz_package).name, npm_package_name)
    })

    it(`installs ${npm_package_name} to prefix`, () => {
      const filename = resolve(npm_package_tgz.toString().trim())
      const prefix = resolve('test_modules')

      // emptyDirSync(prefix)
      execSync('npm run preinstall', {cwd: dirname(tgz_package)})
      execSync('npm install', {cwd: dirname(tgz_package)})
      // execSync(`npm run preinstall`, {cwd: dirname(tgz_package)})
      // console.log( execSync(`npm install`, {cwd: tmpdir}).toString() )
      // console.log( execSync(`cat ${tmpdir}/package.json`).toString() )
      // console.log( execSync(`npm run preinstall`, {cwd: tmpdir}).toString() )
      // console.log( execSync(`npm build`, {cwd: tmpdir}).toString() )
    })
  })
})





    // })

    // describe(`from local source`, function () {
    //   const npm_package_tgz = execSync(`npm pack`)
    //
    //   before(done => remove(npm_package_tgz, done))
    //
    //   it('prunes cwd first', done => {
    //     remove(`${npm_package_name}-${npm_package_version}.tgz`, done)
    //   })
    //
    //   // pack the module
    //   // extract .tgz/package folder to tmpdir/npm_package_name
    //   // npm install --prefix tmpdir tmpdir/npm_package_name
    //   // assert tmpdir/node_modules/.bin/athenapdf links to prefix/node_modules/athenapdf/cli/bin/athenapdf
    //
    //   // const tgz = execSync('npm pack')
    //   // const prefix = join(tmpdir(), tgz.toString())
    //
    //   before(prefixSetupFn => {
    //     this.zipped = execSync('npm pack')
    //     this.prefix = join(cwd(), 'test_modules', this.tgz.toString())
    //
    //     // const tmpLink = join(cwd(), `tmp`, tgz)
    //     // ensureSymlink(prefix, tmpLink, prefixSetupFn)
    //   })
    //
    //   it(`installs module to prefix`, () => {
    //     // tar -xvz -s/package/foo/ -f athenapdf-prebuilt-0.0.0.tgz
    //
    //
    //     // npm install --prefix ${prefix} tarball
    //     // const prefix = join(cwd(), 'test_modules', )
    //     // emptyDir(prefix)
    //   })
    //
    //   // const tgz =
    //   //     ,
    //
    //
    //   // execSync(`tar -xvz -s/package/${npm_package_name}/ -f ${tgz}`)
    //   // execSync(`npm run preinstall`, {cwd: prefix})
    //
    //   // execSync(`npm install --prefix ${prefix} .`)
    //   // execSync(`npm install --prefix ${prefix} ${tgz}`)
    //     //
    //
    //     // tarExtract(npm_package, {dst: prefix}) // fixme: github issue
    //     // npmPreInstall(prefix) // fixme: github issue
    //     // npmInstall(prefix) // mkdir -p /tmp/path/to/package
    //     //                    // npm i --prefix /tmp/path/to/package $(npm pack)
    //   // const filename = join(cwd(), execSync(`npm pack`).toString())
    //   //     , testdir = join(cwd(), filename)
    //   // try {
    //   //   console.log( execSync(`rm -rf ${testdir}`) )
    //   //   console.log( mkdirSync(testdir) )tall
    //   // } finally {
    //     // tar xvf ${filename} --strip=1 ${filename}
    //     // tar xvf athenapdf-prebuilt-0.0.0.tgz --strip=1 athenapdf-prebuilt-0.0.0.tgz
    //     /*
    //     console.log( execSync(`tar -zxvf ${filename} -C /package filename
    //        tar -npm install --prefix ${testdir} --global ${filename}`) )
    //     console.log( execSync(`npm install --prefix ${testdir} --global ${filename}`) )*/
    // })
    // // console.log(`mkdir -p test_modules`)
    // // console.log(`npm install --prefix test_modules -g ${npm_package}`)
    // // it('it has an executable within `node_modules/.bin/athenapdf`')
  // })

//
// })
