import fg from 'fast-glob';
import fs from 'fs/promises';
import fse from 'fs-extra';
import path from 'path';

async function generateComponent() {
    const files = await fg(["src/icons/**.svg"], {
        cwd: process.cwd(),
        absolute: true,
        onlyFiles: true,
    });
    console.log(files, 'ttttttttttttt');
    files.forEach(async (file) => {
        const content = await fs.readFile(file, 'utf8');
        const dir = path.join(file, '../..');
        const iconDir = path.join(dir, '/components-icon');
        console.log(dir, 'wwwwwwwwwwwwwwwwwwwwwwww');
        await fse.ensureDirSync(iconDir);
        fse.ensureFile(path.join(iconDir, ))
        // fse.ensureFile('newutils/seq.js', err => {
        //     if (err) throw err
        //     console.log('success')
        //   })
    })
}

generateComponent();
