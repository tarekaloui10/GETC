const {likes}=require("../data/store");
exports.toglike=(req, res) => {
  const postid=parseInt(req.params.postid);
  if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
  const userid=req.user.userid;
  const index = likes.findIndex(l=> l.postId === postid && l.userId === userid
  );
  if(index!==-1){
    likes.splice(index,1);
    return res.json({
      message:"post unliked",
    });
  }
  likes.push({
    postid,
    userid
  });
  res.json({
    message:"post liked ",
  });

};
exports.getlike=(req,res)=>{
      const postid = parseInt(req.params.postid);
      if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
      const count=likes.filter(l => l.postId ===postid).length;
      res.json({
        postid,
        likes:count,
      });
  };