import express from "express"
import { randomBytes } from "crypto";

const app = express()
app.use(express.json())

function generateShortcode() {
  return randomBytes(3).toString("hex"); 
}
app.post("/shorturls",async(req,res)=>{

    const {url,validity=30,shortCode} = req.body
    try{
        new URL(url);
    }
    catch(err){
        return res.status(200).json({error:"Invalid format"})
    }

    const expiryDate = new Date(Date.now()+validity*60*1000);
    let shortcode = shortCode||generateShortcode();
    
})
