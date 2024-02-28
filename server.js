/**
 * This is the starting file of the project
 */
const express=require("express")
const mongoose=require("mongoose")
const app=express()
const server_config=require("./config/server.config")
const db_config=require("./config/db.config")
const user_model=require("./models/user.model")
const bcryptjs=require("bcryptjs")


/**
 *  Create a admin user at the staring of the project , if the admin user is not
    already present
 */
//connection with mongodb
    mongoose.connect(db_config.DB_URL)
    const db=mongoose.connection
    db.on("error", ()=>{console.log("Error while connectiing to DataBase")})
    db.once("open", ()=>{
        console.log("connected to mongodb")
        init()
    })

    async function init(){
        try{
            let user= await user_model.findOne({userid:"admin"})

            if(user){
                console.log("Admin is already present")
                return
            }
        }catch(err){
            console.log("Error while reading the data", err)
        }
       
        try{
            user=await user_model.create({
                name:"Manas Charchi",
                userid:"admin",
                email:"charchimanas2018@gmail.com",
                userType:"ADMIN",
                password: bcryptjs.hashSync("hyy",8) 
                /**
                 * See here we use bcryptjs to make the password not visible to anyone,
                 * and hasSync is a bcryptjs fucntion help us do that , it added a salt
                 * of 8, basically what is do it add 8 character after the password and
                 * change  it to a hashcode
                 */
            })
            console.log("Admin Created",user)
                
        }catch(err){
            console.log("Error while creating admin", err)
        }
    }


/**
 * Start the Server
 */

app.listen(server_config.PORT, ()=>
   { console.log("Start Server at Port number: ", server_config.PORT)})