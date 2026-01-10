const express=require("express");
const router=express.Router();
const {paginationVlidator}=require("../validators/pagination.validator");
const authMiddleware=require("../middleware/auth.middleware");
const check=require("../middleware/check.middleware");
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
router.get("/",paginationVlidator,check,getps);
router.get("/:postid",getp);
module.exports=router;



