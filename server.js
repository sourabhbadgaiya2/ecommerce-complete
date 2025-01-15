import app from "./src/app.js";
import config from "./src/config/env.config.js";
import connectDB from "./src/db/db.js";
import http from "http";

// Connect to Database
connectDB();

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
