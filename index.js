const express = require("express"); // express ko require kry ga
const path = require("path"); // path ko require krny ka maqsad hai k ye mukhtalif directories ya files k path define krny k liye use hota hai
const app = express(); // yahan express function ko execute kr k app variable k andar store kr diya
const mongoose = require("mongoose");
const methodoverride = require("method-override");

// phir database k sath connect krna hai
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
};
main().catch(console.error);


const port = 3000; // server k liye port define ki

app.use(express.static("public") );  // static files ki location define ki
app.set("view engine", "ejs"); // view engine ko ejs set kr diya
app.set("views", path.join(__dirname, "/views") ); // views directory ka path define kiya jahan express ejs files ko view kry ga
app.use(express.static(path.join(__dirname, "/public"))); // public directory k path ko set kiya
app.use(express.urlencoded({extended: true})); // Middleware for parsing URL-encoded request bodies

app.use(express.static(path.join(__dirname, "/public/javaScript")));
// app.use(express.static(path.join(__dirname, "/public/CSS")));
// ye public dir me 2 alag alag folder ko serve krny ki liye path set kiya agar koi or sub dir ka b path define krna hai to aisy e hoga, jesy pictures k liye koi dir bnai ya sounds k liye to isi tra path set hoga
app.use(methodoverride("_method"));


// Schemas
// schema for cards
const cardSchema = new mongoose.Schema({
    title: { 
        type: String ,
        required: true 
    },
    description:{
        type: String,
        required: true
    },
});
const Card = mongoose.model("Card" ,cardSchema);

// schema for skills
const skillSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    }
});
const Skill = mongoose.model("Skill", skillSchema);


// ___________________________________________


app.listen(port, ()=>{
    console.log(`App is listening on port=${port}`);
}); // requests ko listen krny k liye zroori code.

app.get("/home", async(req, res)=>{
    let allCards = await  Card.find({});
    let skills = await Skill.find({});
    res.render("index", {allCards, skills});
})


// edit cards route "2 steps"
app.get("/home/:id/edit", async(req, res)=>{
    const id= req.params.id;
    let editCard = await Card.findById(id);
    res.render("edit.ejs", {editCard});
})
// updating edited card
app.put("/home/:id", async(req, res)=>{
    let id = req.params.id;
    let {title, description} = req.body;
    let update = await Card.findByIdAndUpdate(id, {
        title: title,
        description: description
    },
    {new: true});
    res.redirect('/home');
})

// delete card
app.delete("/home/:id", async(req, res)=>{
    let id = req.params.id;
    await Card.findByIdAndDelete(id);
    res.redirect('/home');
});

// create new card route
app.get("/home/new", (req, res)=>{
    res.render('new');
});

// submitting new card
app.post("/home/new", async(req, res)=>{
    let  {title, description}= req.body;
    let newCard = new Card ({
        title:  title,
        description: description
});
    await newCard.save();
    res.redirect('/home');
});

// ______________________________________________________
// add new skill rouute
app.get("/home/newskill", (req, res)=>{
    res.render("newskill");
});

// submiting a new skill to the database
app.post("/home/newskill", async(req, res)=>{
    let {title, image}= req.body;
    let newskill = new Skill({
        image: image,
        title: title
    });
    await newskill.save();
    res.redirect("/home");
})






app.get("/about", (req, res)=>{
    res.render("about");
})

app.get("/contact", (req, res)=>{
    res.render("contact");
})
