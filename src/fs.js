import { createReadStream } from 'fs';
import { rename, writeFile } from 'fs/promises';
import { FAIL } from './constants.js';

export const read = async(pathToFile) => {
    try {
        const data = createReadStream(pathToFile);
        for await (let chunk of data) {
            console.log(chunk.toString());
        }
    } catch(e) {
        console.error(FAIL);
    }
}

export const create = async (name) => {
    try {
        await writeFile(name, '', { flag: 'wx+' });
    } catch(e) {
        console.error(FAIL);
    }
}

export const renameFile = async (oldname, newname) => {
    try {
        await rename(oldname, newname);
    } catch(e) {
        console.error(FAIL);
    }
}