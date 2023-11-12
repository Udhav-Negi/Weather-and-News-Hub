import cookieParser from "cookie-parser"
const auth = (req, res, next)=>{
    if(req.cookies.jwt == null)
    {
        res.locals.isCookie = false;
    }
    else
    {
        res.locals.isCookie = true;
    }
    next();
}
export default auth