import puppeteer from 'puppeteer';

export async function scrapeWoolWorthsProduct(url: string) {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.goto(url,{waitUntil: ['networkidle2']});
    // await page.pdf({path: 'example.pdf', format: 'A4'})
    // await browser.close();
    const html = await page.evaluate(() => 
        Array.from(document.querySelectorAll('.shelfProductTile .shelfProductTile-content '), (e) => ({
            title: e.querySelector('.shelfProductTile-information h1').innerText,
            price: e.querySelector('.shelfProductTile-informationContainer .ar-product-price .shelfProductTile-price .price-frame .price span').innerHTML,
        }))
    );
    console.log(html);
    return null
}
