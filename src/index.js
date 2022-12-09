import { createInterface } from 'readline';
import { stringHandler } from './stringHandler.js';
import { FAIL } from './constants.js';
import { exit } from './exit.js';
import { homedir } from 'os';
import { changeDir, dirname, list, upDir, whreami } from './navigation.js';
import { operationSystem } from './os.js';
import { read, create, renameFile, copy, remove, move } from './fs.js';
import { calculateHash } from './hash.js';

const argv = process.argv.slice(2);

const username = argv.filter(str => {
    return str.startsWith('--username');
}).toString().split('=')[1] || 'Anonimus';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});



readline.on('line', async (line) => {
    try {
        const [ command, optionOne, optionTwo ] = stringHandler(line);
    
        switch(command) {
            case '.exit':
                exit(username);
                break;

            case 'cd':
                changeDir(optionOne);
                whreami(dirname);
                break;

            case 'up':
                upDir();
                whreami(dirname);
                break;

            case 'ls':
                list();
                whreami(dirname);
                break;

            case 'os':
                operationSystem(optionOne);
                whreami(dirname);
                break;
            
            case 'cat':
                await read(optionOne);
                whreami(dirname);
                break;
            
            case 'add':
                create(optionOne);
                whreami(dirname);
                break;

            case 'rn':
                renameFile(optionOne, optionTwo);
                whreami(dirname);
                break;

            case 'cp':
                await copy(optionOne, optionTwo);
                whreami(dirname);
                break;

            case 'rm':
                await remove(optionOne);
                whreami(dirname);
                break;

            case 'mv':
                await move(optionOne, optionTwo);
                whreami(dirname);
                break;
            
            case 'hash':
                await calculateHash(optionOne);
                whreami(dirname);
                break;
                
            default: console.log('Invalid input');
        }
    } catch(e) {
        console.error(FAIL);
    }
});

readline.on('SIGINT', () => {
    exit(username);
});

const boostrap = () => {
    console.log(`Welcome to the File Manager, ${username}!`);
    changeDir(homedir());
    whreami(dirname);
}

boostrap();