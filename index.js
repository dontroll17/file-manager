import { createInterface } from 'readline';
import { homedir } from 'os';
import { read, create, renameFile, remove, move, copy } from './files.js';
import { compress, decompress } from './zip.js';
import { changeDir, list, upDir } from './navigation.js';
import { osFunc } from './os.js';
import { calcHash } from './hash.js';
import { exit } from './exit.js';
import { FAIL } from './constants.js';

const arg = process.argv.slice(2);

const username = arg.filter(x => {
    return x.match(/^--username/);
}).toString().slice(11) || 'Username';


const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});


const lineComp = (line) => {
    return line.trim().split(' ');
}

readline.on('line', async line => {
    try {
        const [command, option, option2] = lineComp(line);

        switch(command) {
            case '.exit':
                exit(username);
                break;

            case 'ls':
                list();
                break;

            case 'up':
                upDir();
                break;

            case 'os':
                osFunc(option);
                break;

            case 'hash':
                calcHash(option);
                break;

            case 'cat':
                read(option);
                break;

            case 'add':
                create(option);
                break;
            
            case 'rn':
                renameFile(option, option2);
                break;

            case 'rm':
                remove(option);
                break;

            case 'mv':
                move(option, option2);
                break;
            
            case 'cp':
                copy(option, option2);
                break;

            case 'compress':
                compress(option, option2);
                break;

            case 'decompress':
                decompress(option, option2);
                break;

            case 'cd':
                changeDir(option);
                break;

            default: console.log('Invalid input');
        }
    } catch(e) {
        console.log(FAIL);
    }
});

readline.on('SIGINT', () => {
    exit(username);
});

const init = () => {
    console.log(`Welcome to the File Manager, ${username}!`);
    changeDir(homedir());
}





init();