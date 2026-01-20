const express=require("express");
const router=express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {getprofile,getidprofile,updatepro}=require("../controllers/profile.contollers");
router.get("/me",authMiddleware,getprofile);
router.get("/profiles/:userid",getidprofile);
router.put("/",authMiddleware,updatepro);
module.exports=router;