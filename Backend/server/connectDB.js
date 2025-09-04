import mongoose from "mongoose"
export async function ConnectDB(){
    const db_URI = process.env.MONGO_URI;
    if(!db_URI){
        console.log("Mongo URI not defined")
        return
    }
    try{
        await mongoose.connect(db_URI)
        console.log("DB connected")
    }
    catch(err){
            console.log("DB error due to ",err);
    }
}