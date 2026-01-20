const pool=require("../db/db");
exports.creatcomment = async (req, res) => {
  const {content} = req.body;
  const postid = parseInt(req.params.pid);
  const userid=req.userid;

  if (isNaN(postid)) {
    return res.status(400).json({
      message: "invalid post id",
    });
  }
  if (!content || content.trim() === "") {
    return res.status(400).json({
    message: "comment content is required",
    });
  }

  try {
    const post = await pool.query(
      "SELECT idpost FROM posts WHERE idpost = $1",
      [postid]
    );

    if (post.rows.length === 0) {
      return res.status(404).json({
        message: "post not found",
      });
    }
    const newcomment = await pool.query(
      "INSERT INTO comments (iduser, idpost, content) VALUES ($1, $2, $3) RETURNING *",
      [userid, postid, content]
    );
    const selectpostower=await pool.query("select iduser from posts where idpost=$1",[postid]);
    const postowner=selectpostower.rows[0].iduser;
    const selectusername=await pool.query("select username from users where iduser=$1",[userid]);
    const username=selectusername.rows[0].username;
    if(postowner!==userid){
      await pool.query("insert into notifications (iduser,typenot,texte) values($1,$2,$3)",[postowner,"comment",`${username} commented your post`]);
    }
    return res.status(201).json({
      message: "comment created successfully",
      comment: newcomment.rows[0],
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};


exports.getc=async(req,res)=>{
    const postid=parseInt(req.params.pid);
    if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
     try {
    const cmnts = await pool.query(
      `SELECT c.idcomment,
              c.content,
              c.createdat,
              u.iduser,
              u.username
       FROM comments c
       JOIN users u ON c.iduser = u.iduser
       WHERE c.idpost = $1
       ORDER BY c.createdat ASC`,
      [postid]
    );

    res.json({
      comments: cmnts.rows,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "internal server error",
    });
  }

};
exports.deletec=async(req,res)=>{
    const cid=parseInt(req.params.cid);
    const userid=req.userid;
    if(isNaN(cid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    try{
      const check=await pool.query(
      "SELECT iduser FROM comments WHERE idcomment = $1",
      [cid]
    );
    if (check.rows.length === 0) {
      return res.status(404).json({
        message: "comment not found",
      });
    }
    if (check.rows[0].iduser !== userid) {
      return res.status(403).json({
        message: "not authorized to delete this comment",
      });
    }
      await pool.query(
      "DELETE FROM comments WHERE idcomment = $1",
      [cid]
    );
     res.json({
      message: "comment deleted",
    });

    }catch (err) {
    console.error(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
    
};

