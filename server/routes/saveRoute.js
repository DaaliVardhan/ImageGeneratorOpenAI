import express from 'express'
import * as dotenv from 'dotenv'
import PostSchema from '../models/postModel.js'
dotenv.config()
const Router = express.Router()

Router.route("/")
    .get(async (req,res)=>{
        try {
            const posts = await PostSchema.find()
            return res.status(200).json({success:true,data:posts})
        } catch (error) {
            return res.status(500).json({success:false,message:error})
        }
    })
    .post(async (req,res)=>{
        const {name,prompt,photo} = req.body;
        try {
            const post = await PostSchema.create({name,prompt,photo})
            return res.status(200).json({message:"post created"})
        } catch (error) {
            return res.status(500).json({message:error})
        }
    })



export default Router;