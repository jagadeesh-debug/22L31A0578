import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import urls from "../db/model.js";

const app = express();
app.use(express.json());
app.use(cors());

function generateShortcode() {
  return randomBytes(3).toString("hex");
}

app.post("/shorturls", async (req, res) => {
  const { url, validity = 30, shortCode } = req.body;

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const expiryDate = new Date(Date.now() + validity * 60 * 1000);
  let shortcode = shortCode || generateShortcode();

  const existing = await urls.findOne({ ShortCode: shortcode });
  if (existing) {
    return res.status(400).json({ error: "Shortcode already exists" });
  }

  const newUrl = new urls({
    longurl: url,
    validity,
    expiryDate,
    ShortCode: shortcode,
  });

  await newUrl.save();

  res.status(201).json({
    shortLink: `http://localhost:4000/${shortcode}`,
    expiry: expiryDate,
  });
});

app.get("/shorturls", async (req, res) => {
  const allUrls = await urls.find({});
  res.json(allUrls);
});

app.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;

  const record = await urls.findOne({ ShortCode: shortcode });
  if (!record) {
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (new Date() > new Date(record.expiryDate)) {
    return res.status(410).json({ error: "Short link expired" });
  }

  return res.redirect(record.longurl);
});

export default app;
