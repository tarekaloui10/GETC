const express=require("express");
const router=express.Router();/*3ibara sna3et app sghira mini version*/
const amiddleware=require("../middleware/auth.middleware");
const {register,login}=require("../controllers/auth.controllers");
const check=require("../middleware/check.middleware");
const {registervald,loginvald}=require("../validators/auth.validator");
router.post("/register",registervald,check,register);/*url map */
router.post("/login",loginvald,check,login);
router.get("/profile",amiddleware,(req,res)=>{
    res.json({message:"protected route accessed",
        user:req.user,

    });
});
module.exports=router;/*i allow otherfile to use router*/
