const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
uuidv4(); 
app.set('view engine','ejs');
app.set("views",path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
const methodoverride = require('method-override')
app.use(methodoverride('_method'))

app.get('/posts/:id/edit',(req,res)=>{
    let {id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('edit.ejs',{post});
})

let posts = [{
    id: uuidv4(),
    username: 'Ashok',
    content:'i love coding'
},{
 id: uuidv4(),
username: "aviral",
content:'i also love coding'
},{
     id: uuidv4(),
username : 'shivansh',
content:'i am preparing for jee'
}];

app.get('/posts/new',(req,res)=>{
    res.render("new.ejs");
})

app.get('/posts',(req,res)=>{
     res.render("index.ejs",{posts});
})
app.get('/posts/:id',(req,res)=>{
    let { id } = req.params;

    let post = posts.find((p) => id === p.id);
    res.render('show.ejs',{post});
     
});
app.post('/posts',(req,res)=>{
    let id = uuidv4();
   let {username ,content} = req.body;
   posts.push({ id , username , content});
     res.redirect("/posts");
    
     console.log(req.body);
})
app.patch('/posts/:id',(req,res)=>{
    let {id } = req.params;
   let newContent = req.body.content;
   let post = posts.find((p)=> id === p.id)
   post.content = newContent
   res.redirect("/posts")
 
})

app.delete("/posts/:id",(req,res)=>{
    let {id } = req.params;
     posts = posts.filter((p)=> id !== p.id)
   
     res.redirect("/posts")
})


app.listen(port,()=>{
    console.log('listening at port 8080');
})