import { Router } from "express";
import {db} from "../../backend.js"
import { ObjectId } from 'mongodb';
import multer from "multer";

const route = Router()
let collection;
const upload = multer().single('file')

route.use((req,res,next)=>{

    collection =  db.collection("single_file_collection");
    next()
})


// GET request for retrive the pdf

route.get("/",async(req,res)=>{


    const val = req.query

    const result = await collection.find(val).toArray();
   
    
    res.json(result[0])
})

// POST request for insert new  pdf

route.post("/",upload,async(req,res)=>{

    const file = req.file

    file.title = req.body.title
    console.log(file)
   

    const result = await collection.insertOne(file);

    res.json({message:"file upload route for edit pdf"})

})



// PUT request for edit the pdf

route.put("/",upload,async(req,res)=>{

    const file = req.file

    // console.log(file)
    file.title = req.body.title

    
    const filter = { title:req.body.title};
    const data = {$set: file}

    const result = await collection.updateOne(filter,data)

    res.json({message:"The get replaced"})
})
export default route