import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./MiddleWare/rateLimiter.js";
import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();
// console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // Middle-ware
app.use(rateLimiter);
// app.use((req,res,next)=>{
//     console.log(`Our Request is ${req.method} & req Url is ${req.url}`);
//     next();
// });
app.use("/api/notes",notesRoutes);


connectDB().then( () => {
    app.listen(PORT, ()=> {
    console.log("Server started on PORT :",PORT);
});
}
);

