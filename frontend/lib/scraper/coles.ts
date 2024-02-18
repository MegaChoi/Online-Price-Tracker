
import axios from "axios";
import * as cheerio from 'cheerio'
import { extractPrice } from "../utils";
import  proxyOptions from './config';
export async function scrapeColesProduct(url: string){
    if(!url) return;

    try {
        const response = await axios.get(url, proxyOptions)
        const $ = cheerio.load(response.data);
        // get title
        const title = $('.product__title').text().trim();
        // get current price
        const currentPrice = extractPrice(
            $('.price')
        );
        // get the orignal price
        let originalPrice = extractPrice(
            $('.price__was') 
        );
        if (isNaN(originalPrice)) {
            originalPrice = currentPrice;
        }    

        // check stock 
        const outOfStock = false;
        // image 
        const image = $('.coles-targeting-ProductImagesWrapper img').eq(1).attr('src') || '{}';
        // discount rate
        const discountRate = ((originalPrice - currentPrice)/originalPrice * 100)
        // category 
        const category = $('.sc-6ac65bb5-0:eq(2)').text().trim();

        const data = {
            url: url,
            title: title,
            image: image,
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice),
            discountRatePercentage: Number(discountRate),
            priceHistory: [],
            category: category,
            isOutOfStock: outOfStock
        }

        return data;
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}