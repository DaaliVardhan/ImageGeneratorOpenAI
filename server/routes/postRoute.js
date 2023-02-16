import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import  { Configuration, OpenAIApi } from "openai"


const Router = express.Router()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_SECRET,
})

const openai = new OpenAIApi(configuration)

Router.route("/")
    .get(async (req,res) =>{
        res.json({message:"hello from dalle api"})
    })
    .post(async (req,res)=>{
        try {
            const {prompt} = req.body
            const aiResponse = await openai.createImage({
                prompt,
                n:1,
                size:'1024x1024',
                response_format:'b64_json',
            })
            // return res.json({response:aiResponse})
            const image = aiResponse.data.data[0].b64_json 
            return res.status(200).json({photo:image})
        } catch (error) {
            
            return res.send({success:false,error})
        }
    })

export default Router