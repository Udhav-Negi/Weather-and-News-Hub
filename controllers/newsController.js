import fetch from "node-fetch";


export default class NewsController {

    static getData = async(temp, page)=>{
        let result = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.API}&category=${temp}&page=${page}`)
        result = await result.json();
        return result;

    }
    
    static parseData(result) {
        result.articles.forEach((item) => {
            if (item.description) {
                item.description = item.description;
            }
            else {
                item.description = "No Description"
            }

        })
    }

    // static HomePage = async (req, res) => {
    //     try {
    //         console.log('inisde home page')
    //         console.log(req.query);
    //         let result = await fetch(`https://newsapi.org/v2/everything?q=india&apiKey=${process.env.API}`);
    //         result = await result.json();

    //         let left = await fetch(`https://newsapi.org/v2/everything?q=general&apiKey=${process.env.API}&page=2`)
    //         left = await left.json();

    //         result.articles.forEach((item) => {
    //             if(!item.urlToImage)
    //             {
    //                 item.urlToImage = "/udhav/img/default.jpg"
    //             }
    //         })

    //         res.render("news", { data: result.articles , left : left.articles});
    //     }
    //     catch (error) {
    //     }
    // }

    static business = async (req, res)=>{
        try {
            if(res.locals.isCookie == true)
            {
                let result = await NewsController.getData("business", 1)
                let left = await NewsController.getData("business", 2);
                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })
                res.render("news", {data : result.articles, left : left.articles})
            }
            else 
            {
                res.redirect('/udhav/login')
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    static entertainment = async (req, res)=>{
        try {
            if(res.locals.isCookie == true)
            {
                let result = await NewsController.getData("entertainment", 1);
                let left = await NewsController.getData("entertainment", 2);
                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })
                res.render("news", {data : result.articles, left : left.articles})

            }
            else 
            {
                res.redirect('/udhav/login')
            }
        } catch (error) {
        }
    }
    static general = async (req, res)=>{
        try {
            if(res.locals.isCookie == true)
            {
                let result = await NewsController.getData("general", 1)
                let left = await NewsController.getData("general", 2);
    

                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })
                res.render("news", {data : result.articles, left : left.articles})

            }
            else 
            {
                res.redirect('/udhav/login')
            }
        } catch (error) {
        }
    }
    static health = async (req, res)=>{
        try {
            if(res.locals.isCookie == true)
            {
                let result = await NewsController.getData("health", 1)
                let left = await NewsController.getData("health", 2);
    
                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })
                res.render("news", {data : result.articles, left : left.articles})

            }
            else 
            {
                res.redirect('/udhav/login')
            }
        } catch (error) {
            console.log(error);
        }
    }
    static science = async (req, res)=>{
        try {
            if(res.locals.isCookie == true)
            {
                let result = await NewsController.getData("science", 1)
                let left = await NewsController.getData("science", 2);
    

                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })
                res.render("news", {data : result.articles, left : left.articles})

            }

            else 
            {
                res.redirect('/udhav/login')
            }
        } catch (error) {
        }
    }
    static sports = async (req, res)=>{
        try {
            if(res.locals.isCookie == true)
            {
                let result = await NewsController.getData("sports", 1)
                let left = await NewsController.getData("sports", 2);
    
                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })
                res.render("news", {data : result.articles, left : left.articles})
            }

            else 
            {
                res.redirect('/udhav/login')
            }
        } catch (error) {
        }
    }
    static technology = async (req, res)=>{
        try {
            if(res.locals.isCookie == true)
            {
                let result = await NewsController.getData("technology", 1)
                let left = await NewsController.getData("technology", 2);
                result.articles.forEach((item) => {
                    if(!item.urlToImage)
                    {
                        item.urlToImage = "/udhav/img/default.jpg"
                    }
                })
                res.render("news", {data : result.articles, left : left.articles})

            }

            else 
            {
                res.redirect('/udhav/login')
            }
        } catch (error) {
            
        }
    }

    static logout = async (req, res)=>{
        res.clearCookie("jwt");
        res.redirect('/udhav')
    }
}