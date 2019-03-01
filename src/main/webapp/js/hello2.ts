import { dog } from './hello1.js';

const zoo = {
    show: () => {
        const message = dog.run('jerry');
        console.log(`dog run in the zoo ${message}`);
        console.log(`dog run in the zoo`);
    }
};

export { zoo };
