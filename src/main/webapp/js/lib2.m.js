import { dog } from "./lib1.m.js";

const zoo = {
    show: () => {
        dog.run();
        console.log(`dog run in the zoo`);
    }
};

export { zoo };