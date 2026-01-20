const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/auth.middleware");
const {getnot,isread,onlyoneread,unreadcounter}=require("../controllers/notifications.controllers");

router.get("/",authMiddleware,getnot);
router.put("/read",authMiddleware,isread);
router.put("/read/:id",authMiddleware,onlyoneread);
router.get("/unreadcount",authMiddleware,unreadcounter);
module.exports=router;


