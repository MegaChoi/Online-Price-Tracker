"use server"

import { getLowestPrice, getHighestPrice, getAveragePrice } from "../utils";
import { conenctToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper/amazon";
import { scrapeColesProduct } from "../scraper/coles";
import { scrapeWoolWorthsProduct } from "../scraper/woolworths";
import { scrapeJBHifiProduct } from "../scraper/jbhifi";
import  Product from "../models/product.models"
export async function scrapeAndStoreProduct(productUrl:string, hostname: string) {
    if(!productUrl) return;
    
    try {
        conenctToDB();

        let scrapedProduct;
        
        if(hostname === 'www.coles.com.au'){
            scrapedProduct = await scrapeColesProduct(productUrl);
        }else if (hostname === 'www.amazon.com.au'){
            scrapedProduct = await scrapeAmazonProduct(productUrl);
        }

        if(!scrapedProduct) return;

        let product = scrapedProduct;
        
        const existingProduct = await Product.findOne({url: scrapedProduct.url})

        if(existingProduct){
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice },
                
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                highestPrice: getHighestPrice(updatedPriceHistory),
                lowestPrice: getLowestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate({
            url: scrapedProduct.url},
            product,
            { upsert:true, new :true}
        )

    } catch (error: any) {
       throw new Error(`Falied to create/update product: ${error.message}`) 
    }
}

export async function getProductByID(productId: string){
    try {
        conenctToDB();

        const product = await Product.findOne({_id: productId});

        if(!product) return null;

        return product;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllProducts(){
    try {
        conenctToDB();

        const products = await Product.find();

        return products;
    } catch (error) {
        console.log(error);
    }
}