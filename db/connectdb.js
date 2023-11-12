import mongoose from "mongoose";

const connectdb = async()=>{
    try{
        const str = process.env.URI ;
        await mongoose.connect(str);
        console.log('connected to database')
    }
    catch(error)
    {
        // console.log('error in connection')
    }
}

export default connectdb;