import { createInterface } from 'readline';
import { stringHandler } from './stringHandler.js';
import { FAIL } from './constants.js';
import { exit } from './exit.js';

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

            case 'user':
                console.log(username);
                break;
        }
    } catch(e) {
        console.error(FAIL);
    }
});