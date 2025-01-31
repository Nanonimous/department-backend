import { Router } from "express";
import {db} from "../../backend.js"
import { ObjectId } from 'mongodb';
import multer from "multer";

const route = Router()
let collection;
const upload = multer().single('file')


route.use((req,res,next)=>{

    collection =  db.collection("major_events");
    next()
})

route.get("/",async(req,res)=>{

    const result = await collection.find({}).toArray()
    console.log(result[0].file.mimetype)

    res.json(result)
})



route.post("/",upload,async(req,res)=>{

    
    const file = req.file
    const data = JSON.parse(req.body.data)
    delete data.videoId

    console.log(data)


    const result = await collection.insertOne({file,data})

    res.json({message:"request came in post major event"})
})

export default route