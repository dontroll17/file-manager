import { chdir, cwd } from 'process';
import { readdir } from 'fs/promises';
import { dirname as pathDirname } from 'path';
import { FAIL } from './constants.js';

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
        console.log(FAIL);
    }
}

const upDir = () => {
    try {
        chdir(pathDirname(cwd()));
        setDirName();
    } catch(e) {
        console.log(FAIL);
    }
}

const list = async () => {
    try {
        const files = await readdir(dirname);
        
        for(let file of files) {
            console.log(file);
        }
    } catch(e) {
        console.log(FAIL);
    }
}

export { changeDir, list, upDir }