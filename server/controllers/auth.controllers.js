const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const user=[];
exports.register=async(req,res)=>{
    /*10 heya nombre ta3 cryptageb eli besh isir 3al pass*/
    const{name,email,password}=req.body;/*ena nabth json lebdan ta3 request yetkafel bkol chay*/
    if(!name||!email||!password){
        return res.status(400).json({
            message:"all fileds are required"
        });
    }
    const hashedpass=await bcrypt.hash(password,10);
    const newuser={
        id:user.length+1,
        name,
        email,
        password:hashedpass
    };
    user.push(newuser);

    const token=jwt.sign(
        {userid:newuser.id},/*payload*/
        process.env.JWT_SECRET,/*secret*/
        {expiresIn:"1h"}
    );
    res.status(201).json({
        message:"registred successfully in successfully",
        token/*atheya zedneh besh back end iwali ya3ref user fi kol mara*/
    });
};
exports.login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({
            message:"all fields must be required"
        });
    }
    const users=user.find(u=> u.email===email)
    if(!users){
        return res.status(401).json({
            message:"the email or the password are inccorrect"
        });
    }
    const same=await bcrypt.compare(password,users.password);
    if(!same){
        return res.status(401).json({
            message:"passord is invalid"
        });
    }
    const token=jwt.sign(
        {userid:users.id},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    res.json({
        message:"logged in successfully",
        token
    });

}
