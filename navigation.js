import { chdir, cwd } from 'process';
import { readdir } from 'fs/promises';

let dirname;

const changeDir = async(pathToDir) => {
    try {
        chdir(pathToDir);
        dirname = cwd();
        console.log(`You are currently in ${pathToDir}`);
    } catch(e) {
        console.log(e);
    }
}

const list = async () => {
    try {
        const files = await readdir(dirname);
        for(let file of files) {
            console.log(file);
        }
    }catch(e) {
        console.log('Operation failed');
    }
}

export { changeDir, list }