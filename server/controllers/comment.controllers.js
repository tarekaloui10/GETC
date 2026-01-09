const {posts,comments}=require("../data/store");
exports.creatcomment=(req,res)=>{
    const {content}=req.body;
    const postid=parseInt(req.params.pid);
    if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    if(!content||content.trim()===""){/*trim dawerha enou mate9belesh el spaces comments khater data besh tet3aba bel feregh && trim tnafi les espases fil edges */
        return res.status(400).json({
            message:"comment's content must be  required",
        });
    }
    const exist=posts.some(p=> p.id==postid);
    if(!exist){
        return res.status(404).json({
            message:"post not found",
        });
    }
    const newcomment={
        id:comments.length+1,
        content,
        postid,
        authorid:req.user.userid,
        createdat:new Date(),
    }
    comments.push(newcomment);
    res.status(201).json({
        message:"comment created successfully",
        comment:newcomment
    });
};

exports.getc=(req,res)=>{
    const postid=parseInt(req.params.pid);
    if(isNaN(postid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    const postcmnts=comments.filter(c=>c.postid===postid);/*besh nekhou kounshi el commets eli teb3in el post athika*/

    res.json({
        comments:postcmnts,
    });
};
exports.deletec=(req,res)=>{
    const cid=parseInt(req.params.cid);
    if(isNaN(cid)){
        return res.status(400).json({
            message:"invalid post id",
        });
    }
    const position=comments.findIndex(c=>c.id===cid);
    if(position===-1){
        return res.status(404).json({
            message:"comments not found",
        });
    }
    /*owership test*/
    const comment=comments[position];
    if(comment.authorid!==req.user.userid){
        return res.status(403).json({
            message:"your not allowed to delete this comments",
        });

    }
    comments.splice(position,1);
    res.json({
        message:"comment deleted successfully",
    });
};

