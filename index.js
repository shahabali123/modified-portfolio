const express = require("express"); // express ko require kry ga
const path = require("path"); // path ko require krny ka maqsad hai k ye mukhtalif directories ya files k path define krny k liye use hota hai
const app = express(); // yahan express function ko execute kr k app variable k andar store kr diya

const port = 3000; // server k liye port define ki

app.use(express.static("public") );  // static files ki location define ki
app.set("view engine", "ejs"); // view engine ko ejs set kr diya
app.set("views", path.join(__dirname, "/views") ); // views directory ka path define kiya jahan express ejs files ko view kry ga
app.use(express.static(path.join(__dirname, "/public"))); // public directory k path ko set kiya

app.use(express.static(path.join(__dirname, "/public/javaScript")));
app.use(express.static(path.join(__dirname, "/public/CSS")));
// ye public dir me 2 alag alag folder ko serve krny ki liye path set kiya agar koi or sub dir ka b path define krna hai to aisy e hoga, jesy pictures k liye koi dir bnai ya sounds k liye to isi tra path set hoga

app.listen(port, ()=>{
    console.log(`App is listening on port=${port}`);
}); // requests ko listen krny k liye zroori code.

app.get("/", (req, res)=>{
    res.render("index");
})

app.get("/about", (req, res)=>{
    res.render("about");
})

app.get("/contact", (req, res)=>{
    res.render("contact");
})
