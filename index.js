import { createInterface } from 'readline';
import { homedir } from 'os';
import { read, create, renameFile, remove, move } from './files.js';
import { compress, decompress } from './zip.js';
import { changeDir, list, upDir } from './navigation.js';
import { osFunc } from './os.js';
import { calcHash } from './hash.js';
import { exit } from './exit.js';

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
        const [command, opt, opt2] = lineComp(line);

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
                osFunc(opt);
                break;

            case 'hash':
                calcHash(opt);
                break;

            case 'cat':
                read(opt);
                break;

            case 'add':
                create(opt);
                break;
            
            case 'rn':
                renameFile(opt, opt2);
                break;

            case 'rm':
                remove(opt);
                break;

            case 'mv':
                move(opt, opt2);
                break;

            case 'compress':
                compress(opt, opt2);
                break;

            case 'decompress':
                decompress(opt, opt2);
                break;

            case 'cd':
                changeDir(opt);
                break;

            default: console.log('Invalid input');
        }
    }catch(e) {
        console.log('Operation failed')
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