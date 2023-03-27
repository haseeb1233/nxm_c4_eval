const express=require("express")
const cors=require("cors")
const {connection} = require("./db")
const { userRouter}=require("./routes/users.route")
const {postRouter}=require("./routes/posts.route")
const{auth}=require("./middleware/auth.middleware")
require("dotenv").config()


const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)


app.listen(process.env.port,async() =>{
    try {
        await connection
       console.log("server is connected mongodb") 

    } catch (error) {
        console.log(error)
    }
    console.log(`server is connected to port ${process.env.port}`)
})
