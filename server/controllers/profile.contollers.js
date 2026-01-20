const pool = require("../db/db");
exports.getprofile=async(req,res)=>{
    const userid=req.userid;
    try{
    const profile=await pool.query("select * from profiles where iduser=$1",[userid]);
    if(profile.rows.length===0){
        return res.status(404).json({
            message:"profile not found"
        });
    }
    res.status(200).json(profile.rows[0]);
}catch(err){
    console.error(err);
    res.status(500).json({
        error:"internal server error"
    });}
}
exports.getidprofile=async(req,res)=>{
    const userid=parseInt(req.params.userid);
    if(isNaN(userid)){
        return res.status(400).json({
            message:"invalid user id"
        });
    }
    try{
        const profile=await pool.query("select * from profiles where iduser=$1",[userid]);
        if(profile.rows.length===0){
            return res.status(404).json({
                message:"profile not found"
            });

        }
        res.status(200).json(
            profile.rows[0]
        );
    
}catch(err){
    console.error(err);
    res.status(500).json({
        error:"internal server error"
    });
}
}
exports.updatepro=async (req,res) => {
const userid=req.userid;
const {bio,avatar,location,website}=req.body;
try{
    const updateprofile=await pool.query("insert into profiles (iduser,bio,avatar,location,website) values($1,$2,$3,$4,$5) on conflict(iduser) do update set bio=excluded.bio,avatar=excluded.avatar,location=excluded.location,website=excluded.website,updatedat=CURRENT_TIMESTAMP returning*",[userid, bio, avatar, location, website]);
    res.status(200).json(updateprofile.rows[0]);

}catch(err){
    console.error(err);
    res.status(500).json({
        error:"internal server error"
    });
}


}


