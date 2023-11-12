import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
const app = express();
import path from 'path'
import ejs from 'ejs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import  jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import fetch from "node-fetch";




//imports 
import routes from './routes/web.js';
import connectdb from './db/connectdb.js';

//connecting database 
connectdb();

const saltRound = process.env.SALTROUNDS;
const port = process.env.PORT;

app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use('/udhav', express.static(path.join(process.cwd(), "static")))
app.set('view engine', 'ejs');


app.use('/udhav', routes);
// app.get('/udhav', Controller.business)

app.listen(port, ()=>{
    console.log(`Click http://localhost:${port}/udhav`);
})