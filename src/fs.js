import { createReadStream, createWriteStream } from 'fs';
import { pipeline  } from 'stream/promises';
import { rename, rm, writeFile } from 'fs/promises';
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

export const copy = async (pathToFile, pathToCopy) => {
    try {
        const read = createReadStream(pathToFile);
        const write = createWriteStream(pathToCopy);
        await pipeline(read, write);
    } catch(e) {
        console.error(FAIL);
    }
}

export const remove = async (path) => {
    try {
        await rm(path);
    } catch(e) {
        console.error(FAIL);
    }
}

export const move = async (pathToFile, pathToCopy) => {
    try {
        await copy(pathToFile, pathToCopy);
        await remove(pathToFile);
    } catch(e) {
        console.error(FAIL);
    }
}