import { createReadStream } from 'fs';
import { writeFile, rename, unlink } from 'fs/promises';

const read = async (pathToFile) => {
    try {
        const data = createReadStream(pathToFile);
        for await(let chunk of data) {
            console.log(chunk.toString());
        }
    } catch(e) {
        console.log('Operation failed');
    }
}

const create = async (name) => {
    try {
        await writeFile(name, '', { flag: 'wx+' });
    }catch(e) {
        console.log('Operation failed');
    }
}

const renameFile = async (oldname, newname) => {
    try {
        await rename(oldname, newname);
    } catch(e) {
        console.log('Operation failed');
    }
}

const remove = async (fileName) => {
    try {
        await unlink(fileName);
    }catch(e) {
        console.log('Operation failed');
    }
}

export { read, create, renameFile, remove }