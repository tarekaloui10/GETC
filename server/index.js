require("dotenv").config();/*loadit .env lel index.js*/
const express = require ("express");/*3ayetet lel express besh ya3meli server without low level code*/
const authroutes = require("./routes/auth.routes");
const postroute=require("./routes/post.routes");
const comment=require("./routes/comment.routes");
const like=require("./routes/like.routes");
const app=express();/*sabit server eli 3amlou express fil code tei*/
/*implimenting*/
app.use(express.json());/*twari server tei kifeh ya9ra data men json*/
app.use("/api/auth",authroutes);/*resipcionist*/
app.use("/api/post",postroute);
app.use("/api",comment);
app.use("/api",like);
app.get('/',(req,res)=>{/*ki nrequest lel url hetha ab3athli message*/
    res.send("GETC BACKEND IS RUNNNGGGGGGGGGGG WHOOOOOOOOOOOOOOOOH!!!!");
});
const port=5000;
app.listen(port,()=>{/*7ell port 5000 ou stana ay request tjik ghadi*/
    console.log(`server is running ${port}`)
});

