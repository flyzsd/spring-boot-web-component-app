"use strict";

const chai = require('chai');
const expect = chai.expect;
const puppeteer = require('puppeteer');

describe('First test suite with puppeteer', function () {
    let browser;
    let page;

    before(async function () {
        browser = await puppeteer.launch({"headless": false});
    });

    after(async function () {
        await browser.close();
    });

    beforeEach(async function () {
        page = await browser.newPage();
    });

    afterEach(async function () {
        await page.close();
    });

    it('should load google.com', async function() {
        await page.goto('https://www.google.com/');
        const title = await page.title();
        expect(title).to.be.a('string');
        expect(title).to.equal('Google');
        expect(title).to.have.lengthOf(6);
    });

    describe('Nested test suite with puppeteer', function () {
        before(async function () {
            // console.log('nested before');
        });

        after(async function () {
            // console.log('nested after');
        });

        beforeEach(async function () {
            // console.log('nested beforeEach');
        });

        afterEach(async function () {
            // console.log('nested afterEach');
        });

        it('should load google.com.sg', async function() {
            await page.goto('https://www.google.com.sg');
            const title = await page.title();
            expect(title).to.be.a('string');
            expect(title).to.equal('Google');
            expect(title).to.have.lengthOf(6);
        });
    });
});