import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { FAIL } from './constants.js';

const readStreamPromise = async (stream) => {
    const readStream = createReadStream(stream);
    const data = [];
    return new Promise((resolve, reject) => {
        readStream.on('data', chunk => data.push(chunk));
        readStream.on('end', () => resolve(data));
        readStream.on('error', err => reject(err));
    });
}

const getHash = (data) => {
    const hash = createHash('sha256').update(Buffer.from(data)).digest('hex');
    console.log(`${hash}`);
}

export const calculateHash = async (pathTofile) => {
    try {
        let data = await readStreamPromise(pathTofile);
        getHash(pathTofile, data);
    } catch(e) {
        console.error(FAIL);
    }
}