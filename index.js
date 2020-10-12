const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const prompts = require('prompts');

async function config(url) {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function trackPrice(page) {
    await page.reload();
    let text = await page.evaluate(() => {
        return document.querySelector('#priceblock_ourprice').innerText;
    })
    console.log(text);
}

async function schedule(page) {
    let job = new CronJob('*/15 * * * * *', () => {
        trackPrice(page);
    }, null, true, null, null, true);
    await job.start();
}

async function main() {
    const res = await prompts({
        type: 'text',
        name: 'url',
        message: 'Enter Product url to monitor: ',

    });
    const page = await config(res.url);
    schedule(page);
}

main();