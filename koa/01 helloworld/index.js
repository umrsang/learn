const Koa  = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    //get获得表单页面
    if(ctx.url==='/' && ctx.method==='GET'){
        let html=`
            <h1>Koa2 request POST</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>age</p>
                <input name="age" /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body=html;
    }
    //post提交表单信息
    else if(ctx.url==='/' && ctx.method==='POST'){
        let pastData=await parsePostData(ctx);
        ctx.body=pastData;
    }
    else{
        ctx.body='<h1>404!</h1>';
    }
 
});

//监听ctx.req变化，获取post请求内容
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata="";
            ctx.req.on('data',(data)=>{
                postdata += data;
            })
            ctx.req.addListener("end",function(){
                let parseData = parseQueryStr( postdata );
                resolve(parseData);
            })
        }catch(error){
            reject(error);
        }
    });
}

//解析post请求内容（字符串），转化成对象
function parseQueryStr(queryStr){
    let queryData={};
    let queryStrList = queryStr.split('&');
    for( let [index,queryStr] of queryStrList.entries() ){
        let itemList = queryStr.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    } 
    return queryData;
}
 
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});