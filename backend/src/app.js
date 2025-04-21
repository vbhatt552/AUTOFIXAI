import express from "express";
import aiRoutes from "./routes/ai.routes.js"
import cors from 'cors'
const app  = express();
app.use(cors());
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("hello");
})
app.use('/ai',aiRoutes)
export default app;