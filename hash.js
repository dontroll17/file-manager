import crypto from 'crypto';
import { readFile } from 'fs/promises';

export const calcHash = async (pathToFile) => {
    try {
        const data = await readFile(pathToFile);
        const str = data.toString();
        const hash = crypto.createHash('sha256').update(str).digest('hex');
        console.log(hash);
        return hash;
    }catch(e) {
        console.error('Operation failed');
    }
}