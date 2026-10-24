import mongoose from "mongoose";
import { error, log } from "node:console";

const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "PORTFOLIO",
    })
    .then(() =>{
        console.log("connected to database.");
    })
    .catch((error) =>{
        console.log(`Some error occured while connecting to Database: ${error}`);
    });
};

export default dbConnection;