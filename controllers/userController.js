import fetch from "node-fetch";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import userModel from "../model/models.js";
import NewsController from "./newsController.js";
import cookieParser from "cookie-parser";
import auth from "../authorization/auth.js";
import UserContactModel from "../model/UserContactModel.js";



const saltRounds = 10;


export default class Controller {
    static defaultGet = async (req, res)=>{
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API}`
            let result = await fetch(url);
            result = await result.json();
            result.articles.forEach((item)=>{
                if(item.description)
                {
                    item.description = item.description.slice(0, 50);
                }
                else
                {
                    item.description = "No Description"
                }

                if(!item.urlToImage)
                {
                    item.urlToImage = "https://images.cnbctv18.com/wp-content/uploads/2023/08/amazon-1019x573.jpg"
                }

            })
            res.render('home', {data : result.articles});
            
        } catch (error) {
            // console.log('error occured ', error)
        }
    }

    static logIn = async(req, res)=>{
        try {
            if(res.locals.isCookie == true)
            {
                let result = await fetch(`https://newsapi.org/v2/everything?q=india&apiKey=${process.env.API}`);
                result = await result.json();

                let left = await fetch(`https://newsapi.org/v2/everything?q=general&apiKey=${process.env.API}&page=2`)
                left = await left.json();

                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })
                res.render("news", { data: result.articles , left : left.articles});
            }

            else 
            {
                res.render('login');
            }
        } 
        catch (error) 
        {
            // console.log(error)
        }
    }


    static logInPost = async(req, res)=>{
        try {
            let {email, password} = req.body;
            let obj = await userModel.findOne({email : email});
            let isemail = false, ispassword = false;

            
            if(obj && Object.keys(obj).length > 0 )
            {
                isemail = true;
                ispassword = await bcrypt.compare(password, obj.password);
                
            }

            if(obj && isemail & ispassword)
            {
                const tokens =  jwt.sign(obj._id.toString(), "secretkey");
                let date_new = new Date();
                res.cookie("jwt", tokens, {maxAge : 360000});
                let data = await userModel.findByIdAndUpdate({_id : obj._id}, {token : tokens});
                let result = await fetch(`https://newsapi.org/v2/everything?q=india&apiKey=${process.env.API}`);
                result = await result.json();

                let left = await fetch(`https://newsapi.org/v2/everything?q=general&apiKey=${process.env.API}&page=2`)
                left = await left.json();

                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })

                res.render("news", { data: result.articles , left : left.articles});
            }
            else 
            {
                res.redirect("/udhav/login");
            }
        }
         catch (error) {
            console.log(error);
        }
    }


    static signUp = async(req, res)=>{
        try{
            res.render('signup')
        }
        catch(error)
        {
            console.log(error);
        }
    }

    static signUpPost = async(req, res)=>{
        try {
            let {firstname, lastname, email, number, password, date, month, year, gender} = req.body;
            console.log(req.body)
            let item = new userModel();
            password = await bcrypt.hash(password, saltRounds);
            item.firstName = req.body.firstname,
            item.lastName = req.body.lastname,
            item.email = req.body.email,
            item.number = req.body.number,
            item.password = password, 
            item.dob = [req.body.date, req.body.month, req.body.year],
            item.gender = req.body.gender, 
            await item.save()
            res.redirect('/udhav/login');
        } 
        catch (error) {

        }
    }

    static weatherGet = (req, res)=>{
        if(res.locals.isCookie)
        {
            res.render('weather');
        }
        else 
        {
            res.redirect('/udhav/login')
        }
    }

    static back = (req, res)=>{
        if(res.locals.isCookie == true)
        {
            res.redirect('/udhav/business')
        }

        else 
        {
            res.redirect('/udhav')
        }
    }

    static contact = (req, res)=>{
        res.render('contact');
    }

    static query = async (req, res)=>{
        let user
        try{
            user = new UserContactModel(req.body);
            await user.save();
            res.redirect('/udhav/');
        }
        catch(err)
        {
            res.json({"error is " : err.message})
        }
    }
}

