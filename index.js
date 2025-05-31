import express from "express";
import config from "./config/index.js";
import cors from "cors";

import { routes } from "./routes/index.js";
import { connectToMongo } from "./db/connectToMongo.js";

// Server initialization
const app = express();

// Cors Config
app.use(
    cors({
        origin: config.ORIGIN,
        credentials: true,
    })
);

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE,PATCH"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Routes
app.use(routes);
app.use((req, res) => {
    res.status(404).json({ status: false, message: "Not Found" });
});

// Database Connection and server initailization
connectToMongo()
    .then(() => {
        app.listen(config.EXPRESS_PORT, () => {
            console.log(`Listening on http://localhost:${config.EXPRESS_PORT}`);
        });
    })
    .catch((error) => {
        console.log("Connection Failed", error);
        return process.exit(1);
    });
