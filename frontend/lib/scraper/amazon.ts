
import axios from "axios";
import * as cheerio from 'cheerio'
import { extractPrice } from "../utils";
import  proxyOptions from './config';
export async function scrapeAmazonProduct(url: string){
    if(!url) return;

    try {
        const response = await axios.get(url, proxyOptions)
        const $ = cheerio.load(response.data);
        // get title
        const title = $('#productTitle').text().trim();
        // get current price
        const currentPrice = extractPrice(
            $('.priceToPay span.a-offscreen'),
        );
        // get the orignal price
        const originalPrice = extractPrice(
            $('.a-price.a-text-price span.a-offscreen'),
        );
        // check stock 
        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        // image 
        const images = 
            $('#imgBlkFront').attr('data-a-dynamic-image') || 
            $('#landingImage').attr('data-a-dynamic-image') ||
            '{}';
        // image
        const imageUrls = Object.keys(JSON.parse(images));
        // discount
        const discountRate = $('.savingsPercentage').text().split('-')[1].replace(/%/g, '');   

        
        const data = {
            url: url,
            title: title,
            image: imageUrls[0],
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice),
            discountRatePercentage: Number(discountRate),
            priceHistory: [],
            category: '',
            isOutOfStock: outOfStock
        }

        return data;
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}