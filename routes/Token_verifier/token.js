import { Router } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const route = Router()
const SECRET_KEY = process.env.SECRET_KEY;

route.post("/",(req,res)=>{


    const token = req.body.token;
    const payload = jwt.verify(token, SECRET_KEY);

    console.log(payload)


    res.json({message:'success'});
})


export default route;