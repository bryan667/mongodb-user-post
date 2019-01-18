const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = mongoose.Schema({
    userInfo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: String,
        required: true,
        maxlength: 100000
    },
    imageID: {
        type: String,
        required: false
    }
}, {timestamps: true})

postSchema.post('save', function(doc, next){
    doc.populate('userInfo').execPopulate().then(()=> {
        next()
    })
})

const Post = mongoose.model('Post', postSchema)
module.exports = { Post }