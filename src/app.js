const express = require("express");
const {userAuth} = require("./middlewares/auth")
const {connectDB} = require("./config/database")
const {User} = require("./models/user");
const app = express();
const PORT = 3000;

// app.use("/", (req, res) =>{
//     res.send("This is from app.use()")
// })
// app.get("/users", userAuth, (req, res)=>{
//     res.send("Users data sent!");
// });
// app.use("/", (req, res)=>{
//     res.send("Hello from Node.")
// });
app.use(express.json());

app.post("/signup", userAuth, async (req, res) => {
    const userData = req.body
    // const user = new User({
    //     firstName: "Shyam",
    //     lastName: "Hari",
    //     emailId: "Shyamahari@gmail.in",
    //     password: "Ram@123",

    // });
    const user = new User(userData)

    try{
        await user.save();
        res.send("User Added Successfully");
    }
    catch(e){
        console.log("Error in adding the user", e.message);
    }
});

app.get("/user", userAuth, async (req, res) => {
    const userEmail = req.body.emailId;

    const users = await User.find({emailId: userEmail});

    console.log(users)

    try{
        if(users.length===0){
            res.send("No Users matched with gievn Email")
        }
        else{
            res.send(users)
        }
    }
    catch(e){
        res.status(400).send("Something Went Wrong!!", e.message);
    }
});

app.get("/feed", async (req, res) => {
    // const userEmail = req.body.emailId
    try{
    const users = await User.find({});

    if(users.length===0){
        res.status(400).send("Could not find user with this email")
    }
    else{
        res.send(users)
    }
}catch(e){
    res.send("Something went wrong!")
}

});

app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;
    try{
        const deletedUser = await User.findByEmaiAndDelete(userId)
        if(deletedUser){
            res.send("user deleted Successfully");
        }
        else{
            res.status(400).send("Can't find user to delete")
        }
    }catch(e){
        res.status(500).send("Something Went Wrong!")
    }
});

app.patch("/user", async (req, res) => {
    const userId = req.body.userId
    const data= req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after",
            runValidators: true
        });
        if(!updateUser){
            res.status(404).send("User not found")
        }
        res.send("User Updated Successfully!")
    }catch(e){
        if(e.name==="ValidationError"){
            res.status(400).send(e.message);
        }
        res.status(500).send("Something went wrong!")
    }
})
connectDB()
.then(()=>{
    console.log("Database Connected successfully!")
    app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
    });
})
.catch((e)=>{
    console.log("Error", e)
})