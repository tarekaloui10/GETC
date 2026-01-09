const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/auth.middleware");
const{
    createp,
    getps,
    getp,
    deletep,
    updatep
}=require("../controllers/post.controllers");
router.post("/",authMiddleware,createp);
router.put("/:postid",authMiddleware,updatep),
router.delete("/:postid",authMiddleware,deletep);
router.get("/",getps);
router.get("/:postid",getp);
module.exports=router;



