const mongoose=require("mongoose")
/**
 * name
 * useId
 * password
 * email
 * userType
 */

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    userId:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        minLength:15,
        lowercase:true,
        unique:true
    },
    userType:{
        type:String,
        required: true,
        default:"CUSTOMER",
        enum:["CUSTOMER", "ADMIN"]
    }
},{timestamps:true, versionKey:false})

module.exports=mongoose.model("User", userSchema)

//as soon i write this it create a Collection name Users(Prural)
//module.exports helps us to make the code available at every where


//timestamps : true helps us to track the time schema is created
//versionKey: false bcz mongo by default add a version key
