const puppeteer = require('puppeteer');

var url = 'https://www.amazon.in/Samsung-Galaxy-Storage-Additional-Exchange/dp/B089MQ7C7V/ref=sr_1_5?dchild=1&qid=1601798136&s=electronics&sr=1-5';

async function main() {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    let text = await page.evaluate(() => {
        return document.querySelector('#priceblock_ourprice').innerText;
    })
    console.log(text);
    await browser.close();
}

main();