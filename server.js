const express = require('express')
const mongo = require('mongoose')
const app = express()
const Blog = require('./models/blog')

mongo.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false")
.then((result)=>console.log('Connected to db'))
.catch((err)=>console.log('Error'))

app.set('view engine', 'ejs')
app.use(express.static('public'));



app.get('/', (req, res)=>{
    res.render('index')
}) 

app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title: "New Blog",
        snippet: "Fav. Movie",
        body: 'Top 10 fav. movies'
    });

    blog.save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
})

app.get('/all-blogs',(req, res)=>{
    Blog.find()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
})

const userRouter = require('./routes/users')

app.use('/users', userRouter)
app.listen(3000)
