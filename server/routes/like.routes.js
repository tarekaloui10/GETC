const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  toglike,
  getlike,
} = require("../controllers/like.controllers");
router.post("/post/:postid/like",authMiddleware,toglike);
router.get("/post/:postid/like",getlike);
module.exports=router;