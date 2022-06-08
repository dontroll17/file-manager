import { chdir, cwd } from 'process';
import { readdir } from 'fs/promises';
import { dirname as pathDirname } from 'path';

let dirname;

const setDirName = () => {
    dirname = cwd();
    console.log(`You are currently in ${dirname}`);
}

const changeDir = (pathToDir) => {
    try {
        chdir(pathToDir);
        setDirName();
    } catch(e) {
        console.log('Operation failed');
    }
}

const upDir = () => {
    try {
        chdir(pathDirname(cwd()));
        setDirName();
    } catch(e) {
        console.log('Operation failed');
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

export { changeDir, list, upDir }