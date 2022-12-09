import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress} from 'zlib';
import { pipeline } from 'stream/promises';
import { FAIL } from './constants.js';

export const compress = async (filename, newFileName) => {
    const zip = createBrotliCompress();
    const read = createReadStream(filename);
    const write = createWriteStream(newFileName);

    try {
        await pipeline(read, zip, write);
    } catch(e) {
        console.log(FAIL);
    }
}

export const decompress = async (filename, newFileName) => {
    const zip = createBrotliDecompress();
    const read = createReadStream(filename);
    const write = createWriteStream(newFileName);

    try {
        await pipeline(read, zip, write);
    } catch(e) {
        console.log(FAIL);
    }
}
