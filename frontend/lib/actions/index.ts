"use server"
import axios, { AxiosResponse, AxiosError } from 'axios';

export async function scrapeAndStoreProduct(productUrl:string, hostname:string) {
    try {
        const url = API + 'post/' + productUrl + '/';
        const response = await axios.post(url);
        
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}




export async function getProductByID(productId: string){
    try {
        const url = API + 'products/'
        return ;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllProducts(){
    try {
        const url = API + 'products/'
        const response = await axios.post(url);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}

const API: string = 'http://127.0.0.1:8000/myapp/';