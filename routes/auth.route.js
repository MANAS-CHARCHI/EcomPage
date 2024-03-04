/**
 * POST localhost:8000/ecomm/api/v1/auth/signup
 * I need to intercept this
 */

const authController=require("../constrollers/auth.controller")
const authMW = require("../middleware/auth.mw")


module.exports=(app)=>{
    app.post("/ecomm/signup",[authMW.verifySignUpBody], authController.signup)

    /**
     * route for
     * Post localhost:8000/ecomm/signup
     */

    app.post("/ecomm/signin", [authMW.verifySignInBody],authController.signin)
} 





