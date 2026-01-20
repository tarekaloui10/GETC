const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/auth.middleware");
const {
    creatcomment,
    getc,
    deletec
}=require("../controllers/comment.controllers");
router.post("/post/:pid/comment",authMiddleware,creatcomment);
router.get("/post/:pid/comment",getc);
router.delete("/comment/:cid",authMiddleware,deletec);
module.exports=router;