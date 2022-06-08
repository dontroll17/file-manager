import { createReadStream, constants } from 'fs';
import { writeFile, rename, unlink, copyFile } from 'fs/promises';
import { FAIL } from './constants.js';

const read = async (pathToFile) => {
    try {
        const data = createReadStream(pathToFile);
        for await(let chunk of data) {
            console.log(chunk.toString());
        }
    } catch(e) {
        console.log(FAIL);
    }
}

const create = async (name) => {
    try {
        await writeFile(name, '', { flag: 'wx+' });
    } catch(e) {
        console.log(FAIL);
    }
}

const renameFile = async (oldname, newname) => {
    try {
        await rename(oldname, newname);
    } catch(e) {
        console.log(FAIL);
    }
}

const remove = async (fileName) => {
    try {
        await unlink(fileName);
    } catch(e) {
        console.log(FAIL);
    }
}

const move = async (pathToFile, destination) => {
    try {
        await copyFile(pathToFile, destination, constants.COPYFILE_EXCL);
        await unlink(pathToFile);
    } catch(e) {
        console.log(FAIL);
    }
}

export { read, create, renameFile, remove, move }