const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

async function isNFTPFP() {
    try {
        (async () => {
            const browser = await chromium.puppeteer.launch({
                headless: false,
                executablePath: await chromium.executablePath
            });
            // const browser = await puppeteer
            const page = await browser.newPage();
            await page.goto('https://twitter.com/0xdig');
            await page.screenshot({ path: 'example.png' });
            
            await browser.close();
        })();
    } catch (error) {
        console.log(error);
    }
}

module.exports = isNFTPFP;