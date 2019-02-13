"use strict";

// const chai = require('chai');
// const expect = chai.expect;
import { expect } from 'chai';
import { zoo } from './lib2.m.js';

describe('zoo', () => {
    it('should show', async () => {
        zoo.show();
    });
});

describe('js array', () => {
    before(async () => {
        console.log("before");
    });

    after(async () => {
        console.log("after");
    });

    beforeEach(async () => {
        console.log("beforeEach");
    });

    afterEach(async () => {
        console.log("afterEach");
    });

    describe('filter duplicates in array', () => {
        it('using filter function', async () => {
            const array = [1, 2, 3, 4, 4, 3, 5];
            const filteredArray = array.filter((value, index, arr) => arr.findIndex(e => e === value) === index);
            console.log(filteredArray);
            expect(filteredArray).to.have.length(5);
        });

        it('using Set', async () => {
            const array = [1, 2, 3, 4, 4, 3, 5];
            const filteredArray = [...new Set(array)];
            console.log(filteredArray);
            expect(filteredArray).to.have.length(5);
        });
    });

    describe('convert array to Map', () => {
        it('using reduce function', async () => {
            const array = [
                {name: "index", type: "uint256"},
                {name: "uuid", type: "bytes32"},
                {name: "owner", type: "address"},
                {name: "passenger", type: "address"},
                {name: "price", type: "uint256"}
            ];
            const resultMap = array.reduce((map, {name, type}) => map.set(name, type), new Map());
            console.log(resultMap);
            expect(resultMap.size).to.equal(5);
        });
    });

});