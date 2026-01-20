const pool=require("../db/db");
exports.toglike=async(req,res)=>{
  const postid=parseInt(req.params.postid);
  const userid=req.userid;
  if(isNaN(postid)){
    return res.status(400).json({message:"invalid post id"});
  }
  try{
    const liked=await pool.query(
      "SELECT idlike FROM likes WHERE iduser=$1 AND idpost=$2",
      [userid,postid]
    );
    if(liked.rows.length>0){
      await pool.query(
        "DELETE FROM likes WHERE iduser=$1 AND idpost=$2",
        [userid,postid]
      );
      return res.json({liked:false,message:"like removed"});
    }
    await pool.query(
      "INSERT INTO likes (iduser,idpost) VALUES ($1,$2)",
      [userid,postid]
    );
    const ownerofpost=await pool.query("select iduser from posts where idpost=$1",[postid])
    const postuserid =ownerofpost.rows[0].iduser;
    const selectusername=await pool.query("select username from users where iduser=$1",[userid]);
    const username=selectusername.rows[0].username;

    if(postuserid !==userid){
      await pool.query(" insert into notifications(iduser, typenot, texte) values($1,$2,$3)",[postuserid,"like",`${username} liked your post`]);
    }
    res.status(201).json({liked:true,message:"post liked"});

  }catch(err){
    console.error(err);
    res.status(500).json({error:"internal server error"});
  }
};

exports.getlike=async(req,res)=>{
  const postid=parseInt(req.params.postid);
  const userid=req.userid||null;
  if(isNaN(postid)){
    return res.status(400).json({message:"invalid post id"});
  }
  try{
    const result=await pool.query(
      "SELECT COUNT(*) FROM likes WHERE idpost=$1",
      [postid]
    );
    const likes=Number(result.rows[0].count);
    let liked=false;
    if(userid){
      const check=await pool.query(
        "SELECT 1 FROM likes WHERE iduser=$1 AND idpost=$2",
        [userid,postid]
      );
      liked=check.rows.length>0;
    }
    res.json({postid,likes,liked});
  }catch(err){
    console.error(err);
    res.status(500).json({error:"internal server error"});
  }
};
