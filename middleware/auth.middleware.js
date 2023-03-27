const jwt= require("jsonwebtoken")




const auth=(req,res,next)=>{

    const token =req.headers.authorization

    if(token){
        var decoded = jwt.verify(token, 'football')
        console.log(decoded)
       if(decoded){
        req.body.userID=decoded.Userid
        next()
       }else{
        res.send({"msg":"pls login first token is incorrect"})
       }
        
    }else{
        res.send({"msg":"pls login first"})
       }
    

}

module.exports={
    auth
}