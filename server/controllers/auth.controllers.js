const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const pool = require("../db/db");
exports.register=async(req,res)=>{
    /*10 heya nombre ta3 cryptageb eli besh isir 3al pass*/
    const{name,email,password}=req.body;/*ena nabth json body ta3 request yetkafel bkol chay*/
    if(!name||!email||!password){
        return res.status(400).json({
            message:"all fileds are required"
        });
    }
    try{
            const hashedpass=await bcrypt.hash(password,10);
            const result=await pool.query("insert into users (username,email,password) values($1,$2,$3) returning iduser",[name,email,hashedpass]

            );/*postgersql bensbalih 1 awel element 2 theni element ect*/
             const token=jwt.sign(
                    {userid:result.rows[0].iduser},/*payload*/
                    process.env.JWT_SECRET,/*secret*/
                    {expiresIn:"1h"}
    );
            return res.status(201).json({
                message:"user registration successfully",
                token
            });

    }catch(err){
        console.error(err);/*this for the developper*/
        if(err.code==="23505"){
            res.status(400).json({
                error:"email is already exist",
            });
        }
        return res.status(500).json({
            error:"Internal error server",
        });
    }
};
exports.login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({
            message:"all fields must be required"
        });
    }
    try{

    
    const verif= await pool.query("select iduser ,email,password from users where email=$1",[email]);
    if(verif.rows.length===0){
        return res.status(401).json({
            message:"the email or the password are inccorrect"
        });
    }
    const same=await bcrypt.compare(password,verif.rows[0].password);
    if(!same){
        return res.status(401).json({
            message:"password is invalid"
        });
    }
    const token=jwt.sign(
        {userid:verif.rows[0].iduser},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    res.json({
        message:"logged in successfully",
        token
    });
}catch(err){
    console.error(err);
    res.status(500).json({
        error:"internal server error"
    });

    
}

}
