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

app.use(express.static(path.join(__dirname, "/public/javaScript")));
app.use(express.static(path.join(__dirname, "/public/CSS")));
// ye public dir me 2 alag alag folder ko serve krny ki liye path set kiya agar koi or sub dir ka b path define krna hai to aisy e hoga, jesy pictures k liye koi dir bnai ya sounds k liye to isi tra path set hoga
app.use(methodoverride("_method"));


// Schemas
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

// let card = new Card({
//     title: "Project Showcase",
//     description: "Explore a collection of my latest projects, ranging from responsive websites to dynamic web applications. Each project showcases my skills and creativity in web development."
// });
// card.save();
// let cards = Card.insertMany([{
//     title: "Skill Set",
//     description: "Discover my proficiency in HTML, CSS, JavaScript, React, Node.js, and more. With a strong foundation in front-end and back-end technologies, I'm equipped to tackle diverse challenges in web development."
// },
// {
//     title: "Work Experience",
//     description: "Dive into my journey as a web developer, where I've collaborated with teams to deliver innovative solutions for clients across various industries. From concept to launch, I bring passion and dedication to every project."
// },
// {
//     title: "Education",
//     description: "Learn about my educational background and how it has shaped my career in web development. With a solid foundation in computer science and continuous learning, I'm always striving for excellence in my field."
// },
// {
//     title:  "Achievements",
//     description: "Connect with me to discuss potential collaborations, project ideas, or just to say hello! I'm always open to new opportunities and would love to hear from you."
// }
// ]);

// ___________________________________________


app.listen(port, ()=>{
    console.log(`App is listening on port=${port}`);
}); // requests ko listen krny k liye zroori code.

app.get("/home", async(req, res)=>{
    let allCards = await  Card.find({});
    res.render("index", {allCards});
})

app.get("/home/:id/edit", async(req, res)=>{
    const id= req.params.id;
    let editCard = await Card.findById(id);
    res.render("edit.ejs", {editCard});
})









app.get("/about", (req, res)=>{
    res.render("about");
})

app.get("/contact", (req, res)=>{
    res.render("contact");
})
