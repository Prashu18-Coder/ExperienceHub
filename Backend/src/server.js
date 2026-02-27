import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./MiddleWare/rateLimiter.js";
import cors from "cors";
import path from "path";
// import dotenv from "dotenv";

// dotenv.config();
// console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

app.use(express.json()); // Middle-ware
app.use(rateLimiter);
// app.use((req,res,next)=>{
//     console.log(`Our Request is ${req.method} & req Url is ${req.url}`);
//     next();
// });
app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))

    app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
});
}
connectDB().then( () => {
    app.listen(PORT, ()=> {
    console.log("Server started on PORT :",PORT);
});
}
);

