/**
 * i need to write the controller / logic to register the USER
 */

const bcryptjs=require("bcryptjs")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret=require("../config/auth.config")

// 


exports.signup = async (req, res)=>{
    /**
     * Logic to create the user
     */

    //1. Read the request body
    const request_body = req.body

    //2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password : bcryptjs.hashSync(request_body.password,8)
    }

    try{

        const user_created = await user_model.create(userObj)
        /**
         * Return this user
         */

        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            password:user_created.password
        }
        res.status(201).send(res_obj)

    }catch(err){
        console.log("Error while registering the user", err)
        res.status(500).send({
            message : "Some error happened while registering the user"
        })
    }

    //3. Return the response back to the user

}
exports.signin=async (req, res)=>{

    //Check if the user id is present in the system
    const user=await user_model.findOne({userId: req.body.userId})
    if(user==null){
        res.status(400).send({
            message:"User ID passed is not a valid user ID"
        })
    }
    //If password is correct

    const isCorrectPassword=bcryptjs.compareSync(req.body.password, user.password)
    if(!isCorrectPassword){
        res.status(401).send({
            message: "Password is Wrong"
        })
    }

    //using JWT we will craete a access token

    const token=jwt.sign({id: user.userId}, secret.secret, {expiresIn: 120}) //id:- what data
                                            //sign is used to create a token
                                            // secretkey is for 
                                            // expire in 120 second after that this token will be expired

    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        accessToken:token
    })





}