import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import postRoute from "./routes/postRoute.js"
import {connectDB} from "./models/connect.js"
import saveRoute from "./routes/saveRoute.js"
dotenv.config()


const app = express()
app.use(cors({
    origin:"https://daalivardhan.github.io/ImageGeneratorOpenAI"
}))
app.options('*', cors());
app.use(express.json({limit:"50mb"}))
app.use("/getImg",postRoute)
app.use("/save",saveRoute)
app.get("/",async (req,res)=>{
    res.json({message:"Hello World"})
})

const startServer = async ()=>{
    try{
        const PORT = process.env.PORT || 8000
        await connectDB()
        app.listen(PORT,()=>{console.log(`Server runs on PORT ${PORT}`)})
    }catch (error){
        console.log(error)
    }
}
startServer()