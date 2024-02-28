/**
 * POST localhost:8000/ecomm/api/v1/auth/signup
 * I need to intercept this
 */

const authController=require("../constrollers/auth.controller")
const authMW = require("../middleware/auth.mw")


module.exports=(app)=>{
    app.post("/ecomm/signup", authController.signup)
} 

