const express=require("express")
const {PostModel}=require("../models/post.model")

const postRouter=express.Router()

postRouter.post("/add",async (req,res) =>{
   try {
    console.log(req.body)
    const posts= new PostModel(req.body)
    console.log(posts)
   await posts.save()
   res.send({"msg":"post added sucessfully"})
   } catch (error) {
    res.send(error)
   }

})


postRouter.get("/",async(req,res)=>{
    const query=req.query
    console.log(query.id)
   if(query.id){
    let data =await PostModel.find({userID:req.query.id})
    res.send(data)
   }
   if(query.comments){
    console.log(+query.comments[0]);
    let data =await PostModel.find({$and:
        [{no_of_comments:{$gte:+query.comments[1]}}, {no_of_comments:{$lte:+query.comments[0]}}]})
        res.send(data)
   }
   if(query.device){
    let data =await PostModel.find({device:req.query.device})
    res.send(data)
   }
})


postRouter.get("/top/:page",async(req,res) =>{
     console.log(req.body.userID)
     let n=req.params.page
    let data =await  PostModel.find({userID:req.body.userID}).sort({no_of_comments:1}).skip(3*n-3).limit(n)
    res.send(data)
    
})

postRouter.patch("/update/:id",async(req,res)=>{
    const id =req.params.id
    
    console.log(id)
    try{
        const new_data=req.body
        console.log(new_data)
        await PostModel.findByIdAndUpdate({_id:id},new_data)
        res.status(200).send("updated sucessfully")

    }catch(err){
        console.log(err)
        res.status(400).send("bad request")
    }
})
postRouter.patch("/delete/:id",async(req,res)=>{
    const id =req.params.id
    
    console.log(id)
    try{
        const new_data=req.body
        console.log(new_data)
        await PostModel.findByIdAndUpdate({_id:id})
        res.status(200).send("deleted sucessfully")

    }catch(err){
        console.log(err)
        res.status(400).send("bad request")
    }
})


module.exports={
    postRouter
}