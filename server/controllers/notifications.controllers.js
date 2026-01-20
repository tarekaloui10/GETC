const pool=require("../db/db");
exports.getnot=async(req,res)=>{
    const iduser=req.iduser;
    try{
        const notif=await pool.query("select * from notifications where iduser=$1 order by createdat desc",[iduser]);
        res.status(200).json(notif.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error:"internal server error"
        });
    }

}
exports.isread=async(req,res)=>{
    const userid=req.userid;
    try{
    await pool.query("update notifications set read=true where iduser=$1 and read=false",[userid]);
    res.status(200).json({
        message:"notification marked as read"
    });

}catch(err){
    console.error(err);
    res.status(500).json({
        error:"internal server error"
    });
}
}

exports.unreadcounter=async(req,res)=>{
     const userid = req.userid;
     try{
        const counter=await pool.query(" SELECT COUNT(*) AS unread FROM notifications WHERE iduser = $1 AND read = FALSE", [userid]);
        res.status(200).json({
        unread:Number(counter.rows[0].count),
     })
}
    catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
   
}
exports.onlyoneread = async (req, res) => {
  const userid = req.userid;
  const notid = req.params.id;

  try {
    const readone = await pool.query(
      "UPDATE notifications SET read = TRUE WHERE idnot = $1 AND iduser = $2 RETURNING *",
      [notid, userid]
    );

    if (readone.rows.length === 0) {
      return res.status(404).json({
        message: "notification not found or not yours",
      });
    }

    res.status(200).json({
      message: "notification marked as read",
      notification: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
};
