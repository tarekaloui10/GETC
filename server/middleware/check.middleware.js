const {validationResult}=require("express-validator");/*besh n3ayet el function eli ta9ra erros mel request eli provaydeha express-validator*/
const check=(req,res,next)=>{/*express dima i3adi tletha hajet el middleware eli homa req,res,next(saya jawha behit3ada)*/
const erros=validationResult(req);/*besh nlem el erros el kol eli fil request ou traja3 objet fih el errors el kol*/

if(!erros.isEmpty()){
    return res.status(400).json({
        result:false,
        erros:erros.array().map(err=>({
            field:err.path,
            message:err.msg
        }))
    });
}
next();
};
module.exports=check;