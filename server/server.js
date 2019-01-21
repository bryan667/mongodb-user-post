const express = require ('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const multer = require('multer')
require('dotenv').config({path:__dirname+'/.env'}) //loads environment variables from .env file into process.env

const app = express ()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const port = process.env.PORT || 3002

app.listen(port, ()=> {
    console.log(`server running on ${port}`)
})

//Models
const {User} = require('./models/user')
const {Post} = require('./models/post')
const {Image} = require('./models/image')

//Middleware
const {auth} = require('./middleware/auth')
const {upload} = require('./middleware/multer')

//=================================================================
//                          USERS
//=================================================================

app.post('/api/users/login', (req, res)=> {
    User.findOne({'email':req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSuccess:false, message: 'Login Failed. Email not found'})
        
        user.comparePassword(req.body.password,(err, didItMatch)=>{
            if(!didItMatch) return res.json({loginSuccess:false, message: 'Incorrect Password'})
            
            user.generateTheAwyis((err,user)=> {
                if(err) return res.status(400).json({success:false, err})
                res.cookie('CRA', user.token).status(200).json({loginSuccess: true})
            })
        })
    })
})

app.get('/api/users/logout', auth, (req,res)=> {
    User.findOneAndUpdate(
        {_id: req.user.id},
        {token:''},
        (err, doc)=>{
        if (err) return res.json({success:false, err})
        return res.status(200).send({
            success: true
        })
    })
})

//register a new user
app.post('/api/users/register', (req, res)=> {    
    const user = new User(req.body)

    user.save((err, docs)=> {
        
        if(err) return res.json({success:false, err})
        res.status(200).json({
            success: true,
            userdata: docs
        })
    })
})

//query userinfo currently logged in
app.get('/api/users/auth', auth, (req, res)=> {
    return res.status(200).json({
        message: 'awyis',
        isAuth: true,
        _id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        imageID: req.user.imageID,
    })
})

// query /userid?id=5c3daf9bdfcae80b34afa8a4
app.get('/api/users/userid', (req, res)=> {
    if (!req.query.id) {
        return res.status(200).send({
            success: false,
            message: 'no userID'
        })
    }

    User.findOne(
        {_id: req.query.id},
        (err, doc)=>{
            if (err) return res.json({success:false, err})
            return res.status(200).json({
                success: true,
                email: doc.email,
                firstname: doc.firstname,
                lastname: doc.lastname,
            })
        }
    )
})


//=================================================================
//                          POSTS
//=================================================================

//create
app.post('/api/posts/newpost', auth, (req, res)=> {
    const post = new Post(req.body)

    post.save((err, doc)=>{
        if (err) return res.json({success:false, err})
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

//update
app.post('/api/posts/postid', auth, (req, res)=> {
    if (!req.body.id) {
        return res.status(200).json({
            success: false,
            message: 'unable to edit post'
        })
    }

    Post.findOneAndUpdate(
        {_id: req.body.id, userInfo: req.body.userInfo},
        {post: req.body.value},
        {new: true},
        (err, doc)=>{
        if (err) return res.json({success:false, err})
        return res.status(200).json({
            success: true,
            message: 'post successfully updated',
            doc
        })
    })
})

//read
//fetch with sortBy,order,limit, skip /docs?sortBy=_id&order=desc&limit=4&skip=5
app.get('/api/posts/docs', (req,res)=> {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let order = req.query.order ? req.query.order : 'desc'
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let skip = req.query.skip ? parseInt(req.query.skip): 0

    Post.
    find().
    populate('userInfo').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err, docs)=> {
        if (err) return res.status(400).send(err)
        return res.json({
            size: docs.length,
            docs
        })
    })
})

//delete
app.get('/api/posts/remove', (req,res)=> {
    Post.
    findOneAndRemove(
        {_id: req.query.id},
        (err)=>{
            if (err) return res.status(400).send(err)
            return res.status(200).json({
                success: true,
                message: 'post deleted',
            })
        })
})

//=================================================================
//                          IMAGES
//=================================================================

app.post('/api/images/upload', upload.single('inputFile'), (req, res, err)=> {
    if (req.body.err) {
        return res.json({ message: req.body.err })
    } else if (err instanceof multer.MulterError) {
        return res.json({ message: 'multer error occurred while uploading file' })
    } else if (!req.file) {
        return res.json({ message: 'No file selected' })        
    } else if (req.file.size > (1024 * 1024)) {
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
        })
        return res.json({ message: 'File is too large, limit 1MB' }) 
    }
    
    // reading file from uploads path
    req.body.data = fs.readFileSync(req.file.path)
    req.body.contentType = req.file.mimetype
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
    })

    const image = new Image(req.body)
    image.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.json({
            success: true,
            message: 'image successfully uploaded',
            imageID: doc._id
        })
    })
})

//query /imageid?id=5c3ea39b83dfa729a8bdc92a
app.get('/api/images/imageid', (req, res)=> {
    if (!req.query.id) {
        return res.status(200).json({
            success: false,
            message: 'no imageID'
        })
    }

    Image.findOne(
        {_id: req.query.id},
        (err, doc)=>{
            if (err) return res.json({success:false, err})
            return res.status(200).contentType(doc.contentType).send(doc.data)
        }
    )
})