const fs = require('fs');
const libpath = require('path');
const { default: axios } = require('axios');
const JSZip = require('jszip');
const JsDiff = require('diff');

const templateDir = libpath.resolve(process.cwd(), `./.paperist/templates/`);

Promise.resolve()
  .then(() => {
    console.info('Fetching files...');
    return axios.get(
      'http://www.ipsj.or.jp/journal/submit/9faeag0000001nsz-att/ipsj_v2.zip',
      { responseType: 'arraybuffer' }
    );
  })
  .then(({ data }) => new JSZip().loadAsync(data))
  .then(zip => {
    console.info('Extracting zip...');

    const templateFiles = zip.folder('ipsj_v2/UTF8').filter(path => {
      return !(/\.pdf$/.test(path) || /sample\.(?:bib|tex)/.test(path));
    });
    const writeFilePromises = templateFiles.map(file => {
      return file.async('nodebuffer').then(buffer => {
        const fileName = libpath.basename(file.name);
        fs.writeFileSync(libpath.resolve(templateDir, `./${fileName}`), buffer);
      });
    });
    return Promise.all(writeFilePromises);
  })
  .then(() => {
    console.info('Applying patch...');
    const filePath = libpath.resolve(templateDir, './ipsj.cls');
    const patchPath = libpath.resolve(__dirname, './ipsj-for-uplatex.patch');
    const ipsjPatch = JsDiff.parsePatch(fs.readFileSync(patchPath, 'utf8'));
    const original = fs.readFileSync(filePath, 'utf8');
    const patched = JsDiff.applyPatch(original, ipsjPatch, {
      compareLine(_lineNumber, line, _operation, patchContent) {
        return line.trim() === patchContent.trim();
      },
    });
    fs.writeFileSync(filePath, patched, 'utf8');
  })
  .then(() => console.log('Done!'))
  .catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(255);
  });
