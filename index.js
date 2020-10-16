const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const prompts = require('prompts');

async function config(url) {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function trackAmazon(page) {
    await page.reload();
    let text = await page.evaluate(() => {
        return document.querySelector('#priceblock_ourprice').innerText;
    })
    console.log(text);
}

async function trackFlipkart(page) {
    await page.reload();
    let text = await page.evaluate(() => {
        return document.querySelector('div._1vC4OE._3qQ9m1').innerText;
    })
    console.log(text)
}

async function schedule(page, platform) {
    let job = new CronJob('*/15 * * * * *', () => {
        switch (platform) {
            case 1:
                trackAmazon(page);
                break;
            case 2:
                trackFlipkart(page);
                break;
        }
    }, null, true, null, null, true);
    await job.start();
}

async function main() {
    const res = await prompts([
        {
            type: 'number',
            name: 'platform',
            message: '1) Amazon\n  2)Flipkart\n'

        },
        {
            type: 'text',
            name: 'url',
            message: 'Enter Product url to monitor: ',
        }]);
    const page = await config(res.url);
    schedule(page, res.platform);
}

main();