import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longurl: { type: String, required: true },
  validity: { type: Number },
  expiryDate: { type: Date },
  ShortCode: { type: String }
});

const urls = mongoose.model("URL", urlSchema);

export default urls;
