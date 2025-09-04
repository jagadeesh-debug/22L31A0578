const urlSchema = new mongoose.schema({
        longurl:{
            type:String,
            required:true
        },
        validity:{
            type:Number
        },
        expiryDate:{
            type:Date,

        },
        ShortCode:{
            type:String,
        }
})