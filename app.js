require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())

const port = process.env.port || 3000

async function dbconnect() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected Successfuly");
    } catch (error) {
        console.log(error)
    }
}

dbconnect();

const Task = require("./Model/Task")

app.post("/task", async(req,res)=>{
    try {
        const {title, iscompleted} = req.body
        if(!title){
            return res.status(400).json({message:"Title is required"})
        }
        const task = await Task.create({title, iscompleted})
        res.status(201).json({message:"Task created successfully", task})
    } catch (error) {
        console.log(error)
    }
})

app.get("/task",async(req,res)=>{
    try {
        const tasks = await Task.find()
        res.json({
            msg:"Requested successfully",
            data: tasks
        })
    } catch (error) {
        console.log(error)
    }
})

app.delete("/task/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }
        res.json({message:"Task deleted successfully"})
    } catch (error) {
        console.log(error)
    }   
});


app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})

