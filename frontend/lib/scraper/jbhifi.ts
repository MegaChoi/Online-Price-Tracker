
import axios from "axios";
import * as cheerio from 'cheerio'
import { extractPrice } from "../utils";
import  proxyOptions from './config';
import puppeteer from 'puppeteer';
export async function scrapeJBHifiProduct(url: string){
    if(!url) return;
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.goto(url,{waitUntil: ['networkidle2']});
    try {
        // const response = await axios.get(url, proxyOptions)
        // const $ = cheerio.load(response.data);
        // // get title
        // const title = $('._12mtftw9').text().trim();
        // // get current price
        // const currentPrice = extractPrice(
        //     $('.PriceTag_actualWrapperDefault__1eb7mu9p ')
        // );
        // // get the orignal price
        // const originalPrice = extractPrice(
        //     $('.StrikeText_styles_container__rkpz4f0') || 0
        // );
        // // check stock 
        // const outOfStock = 'N/A';
        // // image 
        // const image = $('.pdp-jss-slide-66 is-selected img').attr('src') || '{}';
        // // discount rate
        // const discountRate = ((originalPrice - currentPrice)/originalPrice * 100)

        // const data = {
        //     url: url,
        //     title: title,
        //     image: image,
        //     currentPrice: Number(currentPrice),
        //     originalPrice: Number(originalPrice),
        //     discountRatePercentage: Number(discountRate),
        //     priceHistory: [],
        //     category: '',
        //     isOutOfStock: outOfStock
        // }

        // console.log(data)

        const html = await page.evaluate(() => {
            // const data = document.querySelector('#pdp .pdp-jss-layoutWrapper-23 .pdp-jss-layout-24 .pdp-jss-layoutRight-27 .pdp-jss-root-31 ');
            
            const titleElement = data.querySelector('.pdp-jss-title-32 ._12mtftw0 h1');
            const priceElement = document.querySelector('#pdp-mob-price-cta .PriceTag_styles_cardContent__1eb7mu91d .PriceTag_priceTag__1eb7mu91c .PriceTag_actualWrapperDefault__1eb7mu9p span.PriceTag_actual__1eb7mu9q ');
            
            return {
                title: titleElement.innerText.trim(),
                price: priceElement.innerHTML,
            };
    
        });
        
        console.log(html);
        
        return null;
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}