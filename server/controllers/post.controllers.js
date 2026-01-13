const {posts}=require("../data/store");
const{getpg}=require("../utils/pagination");
 exports.createp=(req,res)=>{
    const{title,content}=req.body;
    if(!title||!content){
        return res.status(400).json({
            message:"you must write somthing",
        });
    }
    const newpost={
        id:posts.length+1,
        title,
        content,
        authid:req.user.userid,
        createdat:new Date(),

    }
    posts.push(newpost);
    res.status(201).json({
        message:"psot created successfully",
        post:newpost

    });

 };
 exports.getps=(req,res)=>{
    const {page,limit,offset}=getpg(req);
    const currentposts=posts.slice(offset,offset+limit)/*slice ta3mel array jdid men start le debut mel array tek*/
     res.status(200).json({
        page,
        limit,
        total:posts.length,
        data:currentposts

    }
    );
 };
 exports.getp=(req,res)=>{
    const postid=parseInt(req.params.postid);
    if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    const post =posts.find(p=>p.id===postid);/*p  hey kol post faaa3st el tableau el post */
    if(!post){
        return res.status(404).json({
            message:"post not found"
        });
    }
    res.json({
        post,/*tawa raja3li el post */
    });
 }
 exports.deletep=(req,res)=>{
    const postid=parseInt(req.params.postid);
    if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    const dpost=posts.findIndex(p=>p.id===postid);/*atheya el index eli besh ndelitouh*/
    if(dpost===-1){
        return res.status(404).json({
            message:"post not found",
        });
    }
    const post = posts[dpost];
    if(post.authid !== req.user.userid){
        return res.status(403).json({
            message:"your not allowed to delet this post",
        });
    }
    posts.splice(dpost,1);
    res.json({
        message:"post deleted succeessssssssssssfully",
    });

 };
 exports.updatep=(req,res)=>{
    const postid=parseInt(req.params.postid);
    if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    const{title,content}=req.body;
    const post=posts.find(p=>p.id==postid);
    if(!post){
        return res.status(404).json({
            message:"post not found",
        });
    }
    /*test ta3 autorisation*/
    if(post.authid !==req.user.userid){
        return res.status(403).json({
            message:"your not allow to update this post"
        });
    }
    if(title) post.title=title;
    if(content) post.content=content;

    res.json({
        message:"post has been updated sucessfully",
        post,
    });

 }
