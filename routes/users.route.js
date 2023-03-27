const express =require("express")
const {UserModel}=require("../models/user.model")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

const userRouter=express.Router()

userRouter.post("/register",async(req,res) =>{
    try {
        let result=await UserModel.find({email:req.body.email})
       if(result.length){
        res.send({"msg":"email already present"})
       }else{
        bcrypt.hash(req.body.password, 5, async(err, hash)=> {
            req.body.password=hash
            console.log(req.body.password)
            let data = new UserModel(req.body)
            await data.save() 
           res.send({"msg":"user added sucessfully"})
        })
       }
    } 
    catch (error) {
        res.send(error)
    }
})

userRouter.post("/login",async(req,res) =>{
    const {email,password}=req.body
      try {

        let data=await UserModel.find({email})
          console.log(data)
        if(data.length){
            bcrypt.compare(password, data[0].password).then((result) => {
                if(result){
                    res.send({"msg":"sucessfully logged in","token":jwt.sign({ Userid: data[0]._id }, 'football')})
                }else{
                    res.send({"msg":"login failed"})
                }
            })

        }else{
            res.send({"msg":"enter correct email"})
        }
        

      } 
      
      catch (error) {
        res.send(error)
      }
})




module.exports={
    userRouter
}