import { arch, cpus, EOL, homedir,userInfo } from 'os';

export const operationSystem = (flag) => {
    switch(flag) {
        case '--cpus':
            const data = cpus();
            const cp = data.length;
            console.log(`cpus length: ${cp}`);
            console.log(`Model: ${data[0].model}`);
            console.log(`Speed: ${data[0].speed}`);
            break;

        case '--EOL':
            console.log(JSON.stringify(EOL));
            break;

        case '--homedir':
            console.log(homedir());
            break;

        case '--architecture':
            console.log(arch());
            break;

        case '--username':
            console.log(userInfo().username);
            break;
            
        default: console.log('Invalid input');
    }
}