const dog = {
    run: () => {
        const array = [1, 2, 3];
        for (const i of array) {
            console.log(`num = ${i}`);
        }
        console.log(`dog run`);
    }
};

export { dog };
