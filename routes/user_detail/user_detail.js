import { Router } from "express";
import {db} from "../../backend.js"
import { ObjectId } from 'mongodb';


const route = Router()
let collection;

route.use((req,res,next)=>{

    collection =  db.collection("user_details");
    next()
})


route.get("/",async(req,res)=>{

    console.log(req.query.reg_no)
    const register_no = req.query.reg_no
    let result;
    if(register_no == null){

        result = await collection.find({ year: { $exists: true } }, { projection: { name: 1, year: 1, register_no: 1 ,_id:0} }).toArray()
    }else{
        result = await collection.find({register_no:register_no}).toArray()
    }

    console.log(result)
    res.json(result)

})


export default route