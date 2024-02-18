import mongoose from "mongoose";

let isConnected = false; // variable to track the connection status

export const conenctToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');
    if(isConnected) return console.log('using existing data connection');

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        isConnected = true;

        console.log('MongdoDB Connected');
    } catch (error) {
        console.log(error)
    }
}