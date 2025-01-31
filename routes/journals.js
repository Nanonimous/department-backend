import { Router } from "express";
import {db} from "../backend.js"
import { ObjectId } from 'mongodb';

const route = Router()
let collection;


route.use((req,res,next)=>{

    collection =  db.collection("journals");
    next()
})

// journal Get request for show the content.
route.get("/",async (req,res)=>{


    const journals = await collection.find({}).toArray();
    

    res.json(journals)
})




// journal POST request for add new content
route.post("/",async(req,res)=>{

    console.log(req.body)
    const newDocument = req.body;
    delete newDocument.videoId
    const journal = await collection.insertOne(newDocument, (err, result) => {
        if (err) {
          console.log('Error inserting document:', err);
        } else {
          console.log('Document inserted:', result.insertedId);
        }
      })

    
    res.json({message:"success"})
})

// journal DELETE request to delete the journal

route.delete("/",async(req,res)=>{
    
    const ob =  req.body.object
    const objectId = new ObjectId(ob);
    const result = await collection.deleteOne({ _id: objectId });


    res.json({message:"deleted successfully"})
})


//journal PUT request to edit the content

route.put("/",async(req,res)=>{

    console.log(req.body)
    const val = req.body;

    delete val.videoId
    console.log(val)

    const filter = { _id : new ObjectId(req.body.videoId) };
    const data = {$set: val}

      const result = await collection.updateOne(filter,data)

    res.json({message:"success"})

})



export default route