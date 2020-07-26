const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
    return res.send('pong');
});
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

app.listen(port);