import { FAIL } from "./constants.js";
import { dirname as pathToDir } from 'path';
import { readdir } from "fs/promises";

export let dirname;

const setDir = () => {
    dirname = process.cwd();
}

export const whereami = (dirname) => {
    console.log(`You are currently in ${dirname}`);
}

export const changeDir = (pathToDir) => {
    try {
        if(!pathToDir) return;
        
        process.chdir(pathToDir);
        setDir()
    } catch(e) {
        console.error(FAIL);
    }
}

export const upDir = () => {
    try {
        process.chdir(pathToDir(process.cwd()));
        setDir();
    } catch(e) {
        console.error(FAIL);
    }
}

export const list = async () => {
    try {
        const files = await readdir(dirname);

        console.table(files);
    } catch(e) {
        console.error(FAIL);
    }
}