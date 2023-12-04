import mongoose from 'mongoose';

const UserContactSchema = mongoose.Schema({
    name : {type : String, required : true, minlength : [5, "name is less than 5 characters"]},
    age : {type : Number, required : true, validate : (val)=>{
        if(val <= 0) 
        throw new Error('age cannot be negative ')
    }
    },
    profession : {type : String, required : true, minlength : [5, "Profession is less than 5 charcaters "]},
    email : {type : String, required : true},
    message : {type : String}
})

const UserContactModel = mongoose.model('User Contact', UserContactSchema);
export default UserContactModel