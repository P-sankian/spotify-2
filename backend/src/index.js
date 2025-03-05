import { clerkMiddleware } from '@clerk/express' //import position and hierarchy?
import { connectDB } from "./lib/db.js";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songsRoutes from "./routes/songs.route.js";
import albumsRoutes from "./routes/albums.route.js";
import statsRoutes from "./routes/stats.route.js";
import fileUpload from "express-fileupload";
import path from "path";
import { error } from 'console';
import cors from "cors";



dotenv.config(); // yeah, it fixes the issue with environment variables loading in process.env

const app = express(); //create a server
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); //sending authorization header


app.use(express.json()); //to parse req.body
app.use(clerkMiddleware()); // will add auth to req object


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname,"tmp"),
    createParentPath: true,
    limits: {fileSize: 10 *1024 * 1024}
}));


//add middleware 
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statsRoutes);


//error handler
app.use((err,req,res,next)=> {
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "internal server error" : err.message});
});


app.listen(PORT, () => {
    console.log("server is running on port" + PORT);
    connectDB();
})


