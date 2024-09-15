import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import { connectDB } from "./lib/db.js";


import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// all the use function
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies

// Used for testing
/* app.get("/", (req, res) => {
    res.send("APi DEveloped by ShubuYeole");
}); */

// All the routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


app.listen(process.env.PORT, () => {
    console.log("Server Started on http://localhost:" + PORT);
    connectDB();
});