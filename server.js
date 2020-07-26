const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname,'build')));

app.get("/",(req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/autores",(req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/autor/edit/:id",(req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/autor/add",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
})
app.get("/notas",(req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/nota/edit/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/nota/add",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/categorias",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});

app.get("/categoria/edit/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/categoria/add",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});


app.listen(8080);
