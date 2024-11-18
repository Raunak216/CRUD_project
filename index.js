const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const student=require("./models/student.js");
const methodOverride = require('method-override');
const port=8080;
const mongo_URL="mongodb://127.0.0.1:27017/java_project";

main()
.then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_URL);
}

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.set(express.static(path.join(__dirname,"public")));
app.listen(port, ()=>{
    console.log("listing to port 8080")
});

app.get("/", (req,res)=>{
    res.send("hi im root");
})
//index route
app.get("/students",async(req,res)=>{
    const allstudents =await student.find({});
    res.render("./students/index.ejs",{allstudents});
})


app.get("/students/new",(req,res)=>{
    res.render("./students/newstudents.ejs");
});

//create route
app.post("/students",async(req,res)=>{
    const newstudents=new student(req.body.student);
   await newstudents.save();
    console.log(newstudents);
    res.redirect("/students")
})


//update route ->1:edit , 2:update
app.get("/students/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const showStudent =await student.findById(id);
    console.log(showStudent);
    res.render("./students/edit.ejs",{showStudent})
})

app.put("/students/:id",async(req,res)=>{
    let{id}=req.params;
    await student.findByIdAndUpdate(id,{...req.body.student});
    res.redirect("/students");
})

//delete route

app.delete("/students/:id",async(req,res)=>{
    let{id}=req.params;
    await student.findByIdAndDelete(id);
    res.redirect("/students")
    })




//show route
app.get("/students/:id",async(req,res)=>{
    let {id}=req.params;
    const showStudents =await student.findById(id);
    res.render("./students/show.ejs",{showStudents});
    
})
