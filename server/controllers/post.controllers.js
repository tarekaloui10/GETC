const{getpg}=require("../utils/pagination");
const pool=require("../db/db");
 exports.createp= async(req,res)=>{
    const{title,content}=req.body;
    const userid=req.userid;
    if(!title||!content){
        return res.status(400).json({
            message:"you must write somthing",
        });
    }
    try{
        const result= await pool.query("insert into posts (iduser,title,content) values($1,$2,$3) returning*",[userid,title,content]);

        res.status(201).json({
            message:"post created successfully", 
            post:result.rows[0]
        });
    }catch(err){
        console.error(err)
        res.status(500).json({
            error:"internal server error"
        });
    }

 };
 exports.getps=async(req,res)=>{
    const {page,limit,offset}=getpg(req);
    const currentposts=await pool.query("select * from posts  ORDER BY createdat ASC limit $1 offset $2 ",[limit,offset]);/*slice ta3mel array jdid men start le debut mel array tek*/
    const allposts=await pool.query("select count(*) from posts ");
     res.status(200).json({
        page,
        limit,
        total:Number(allposts.rows[0].count),
        data:currentposts.rows

    }
    );
 };
 exports.getp=async(req,res)=>{
    const postid=parseInt(req.params.postid);
    if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    try{

    
    const post =await pool.query("select * from posts where idpost=$1",[postid])/*p  hey kol post faaa3st el tableau el post */
    if(post.rows.length===0){
        return res.status(404).json({
            message:"post not found"
        });
    }
    res.json({
        postt:post.rows[0]/*tawa raja3li el post */
    });
 }catch(err){
    console.error(err)
    return res.status(500).json({
        error:"internal server",
    });
 }
}
 exports.deletep=async(req,res)=>{
    const postid=parseInt(req.params.postid);
    const userid=req.userid;
    if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    try{
    const dpost=await pool.query("select iduser from posts where idpost=$1",[postid]);/*atheya el index eli besh ndelitouh*/
    if(dpost.rows.length===0){
        return res.status(404).json({
            message:"post not found",
        });
    }
    const post = dpost.rows[0];
    if(post.iduser !== userid){
        return res.status(403).json({
            message:"your not allowed to delet this post",
        });
    }
    await pool.query("delete from posts where idpost=$1",[postid])
    res.json({
        message:"post deleted succeessssssssssssfully",
    });

    }catch(err){
        console.error(err)
        res.status(500).json({
            error:"internal server error"
        });
    }

 };
 exports.updatep = async (req, res) => {
  const postid = parseInt(req.params.postid);
  const userid = req.userid;
  const { title, content } = req.body;

  if (isNaN(postid)) {
    return res.status(400).json({ message: "invalid post id" });
  }

  if (!title || !content) {
    return res.status(400).json({
      message: "title and content are required",
    });
  }

  try {
    const post = await pool.query(
      "SELECT iduser FROM posts WHERE idpost = $1",
      [postid]
    );

    if (post.rows.length === 0) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post.rows[0].iduser !== userid) {
      return res.status(403).json({
        message: "you are not allowed to update this post",
      });
    }

    const updated = await pool.query(
      `UPDATE posts
       SET title = $1,
           content = $2
       WHERE idpost = $3
       RETURNING *`,
      [title, content, postid]
    );

    res.json({
      message: "post has been updated successfully",
      post: updated.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
};
