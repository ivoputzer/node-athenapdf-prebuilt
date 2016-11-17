const {exec} = require('child_process')
const {join, resolve, basename} = require('path')
const {move, access, remove, constants:{S_IXUSR, S_IXGRP, S_IXOTH}} = require('fs-extra')
const {tmpdir:tmpDir=require('os').tmpDir} = require('os') // @node6 os.tmpDir

describe(`as a developer`, function(){
  const {cwd, env:{npm_package_name}} = process
  const tmpdir = tmpDir()
  describe(`i want to install the latest version of ${npm_package_name}`, function(){
    before(done => {
      exec(`npm pack`, (err, stdout) => {
        if (err) return done(err)
        this.tgz = join(tmpdir, stdout.toString().trim())
        remove(this.tgz, (err) => {
          if (err) return done(err)
          let packed = resolve(basename(this.tgz))
          move(packed, this.tgz, done)
        })
      })
    })
    it('installs locally packaged tgz', done => {
      const node_modules = join(tmpdir, 'node_modules')
      remove(node_modules, (err) => {
        if (err) return done(err)
        exec(`npm install ${this.tgz}`, {cwd: tmpdir}, (err, stdout) => {
          if (err) return done(err)
          access(join(node_modules, '.bin', 'athenapdf'), S_IXOTH, done)
        })
      })
    })
    it('installs packge from registry', done => {
      const node_modules = join(tmpdir, 'node_modules')
      remove(node_modules, (err) => {
        if (err) return done(err)
        exec(`npm install ${npm_package_name}`, {cwd: tmpdir}, done) // skip binary check
      })
    })
  })
})
