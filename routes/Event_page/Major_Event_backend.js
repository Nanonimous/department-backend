import { Router } from "express";
import {db} from "../../backend.js"
import { ObjectId } from 'mongodb';
import multer from "multer";

const route = Router()
let collection;
const upload = multer().single('file')

// Major events Get request for show the content.
route.use((req,res,next)=>{

    collection =  db.collection("major_events");
    next()
})

route.get("/",async(req,res)=>{

    const result = await collection.find({}).toArray()
   

    res.json(result)
})



// Major events POST request for add new content

route.post("/",upload,async(req,res)=>{

    
    const file = req.file
    const data = JSON.parse(req.body.data)
    delete data.videoId

    console.log(data)


    const result = await collection.insertOne({file,data})

    res.json({message:"request came in post major event"})
})

// Major events DELETE request to delete the journal

route.delete("/",async(req,res)=>{
    
    const ob =  req.body.object
    const objectId = new ObjectId(ob);
    console.log(ob)
    const result = await collection.deleteOne({ _id: objectId });


    res.json({message:"deleted successfully"})
})


// Major events  PUT request to edit the content

route.put("/",upload,async(req,res)=>{

     
    const file = req.file
    const data = JSON.parse(req.body.data)
    
    const filter = { _id : new ObjectId(data.videoId) };
    delete data.videoId

    
    if (file == null){
        const result = await collection.updateOne(filter,{$set:{data}})
    }else{
        const result = await collection.updateOne(filter,{$set:{file,data}})
    }

   

    res.json({message:"success"})

})


export default route