const mongoose=require("mongoose");
const initData=require("./data.js");
const student=require("../models/student.js");

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

const initDb=async()=>{
    await student.deleteMany({});
    await student.insertMany(initData.data);
    console.log("data imported successfully")
}
initDb();