import { Router } from "express";
import {db} from "../backend.js"
import { ObjectId } from 'mongodb';

const route = Router()
let collection;

route.use((req,res,next)=>{

    collection =  db.collection("patent");
    next()
})


// patent Get request for show the content.

route.get("/",async(req,res)=>{

    const result  = await collection.find({}).toArray();

    console.log(result)
    res.json(result)
})


// patent POST request for add new content

route.post("/",async(req,res)=>{


    // console.log(req.body)
    let newDocument = req.body;
    delete newDocument.videoId
    const result  = await collection.insertOne(newDocument, (err, result) => {
            if (err) {
              console.log('Error inserting document:', err);
            } else {
              console.log('Document inserted:', result.insertedId);
            }
        });

    // console.log(result)
    res.json({message:"success"})
})



// patent DELETE request to delete the journal

route.delete("/",async(req,res)=>{
    
    const ob =  req.body.object
    const objectId = new ObjectId(ob);
    const result = await collection.deleteOne({ _id: objectId });


    res.json({message:"deleted successfully"})
})



// paper conference  PUT request to edit the content

route.put("/",async(req,res)=>{

    // console.log(req.body)
    const val = req.body;

    const filter = { _id : new ObjectId(req.body.videoId) };
    delete val.videoId
    console.log(val)

    const data = {$set: val}

      const result = await collection.updateOne(filter,data)

    res.json({message:"success"})

})








export default route;