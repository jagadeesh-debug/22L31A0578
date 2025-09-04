  import "dotenv/config"
  import { ConnectDB } from "./server/connectDB.js"
  import app from "./server/shortUrl.js"

  async function startServer() {
    await ConnectDB();
    app.listen(3000);
  }

  startServer();