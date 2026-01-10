exports.getpg=(req)=>{
    let page=parseInt(req.query.page);
    if(!page){
        page=1;
    }
    let limit=parseInt(req.query.limit);
    if(!limit){
        limit=10;
    }
    const offset=(page-1)*limit;/*number of skipped page*/

    return {page,limit,offset};

}