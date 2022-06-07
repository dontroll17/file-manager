import { EOL , cpus, homedir, hostname, arch} from 'os';

export const osFunc = (act) => {
    switch(act) {
        case '--cpus':
            const data = cpus();
            const cp = data.length;
            console.log('cpus length: ', cp);
            console.log('Model: ', data[0].model);
            console.log('Speed: ', data[0].speed);
            break;

        case '--EOL':
            console.log(JSON.stringify(EOL));
            break;

        case '--homedir':
            console.log(homedir());
            break;

        case '--username':
            console.log(hostname());
            break;

        case '--architecture':
            console.log(arch());
            break;

        default: console.log('Invalid input');
    }
}