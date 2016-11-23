athenapdf-prebuilt
===
a prebuilt version of [athenapdf](https://github.com/arachnys/athenapdf) for [npm](https://npmjs.org).

## install
```bash
npm install -g athenapdf-prebuilt
athenapdf --help
```

## uninstall
```bash
npm uninstall -g athenapdf-prebuilt
```

## usage
```javascript
const athenapdf = require('athenapdf-prebuilt')
const {spawn} = require('child_process')

console.log(athenapdf) // prints the path to the executable

spawn(athenapdf)
```
