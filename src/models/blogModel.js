const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

 const blogSchema = new mongoose.Schema({
     "title" : {
         type : String,
         required : 'Title is required',
         trim : true
     },
     "body" : {
        type : String,
        required : 'Body is required',
        trim : true
    },
    "authorId" : {
        type : objectId,
        refs : 'project1Author',
        required : 'Author Id is required'
    },
    "tags" : ["String"],
    "category" : {
        type : ["String"],    // [technology, entertainment, life style, food, fashion]
        required : 'Category is required',
        trim : true
    },
    "subcategory" : ["String"],
    "deletedAt" : {
        type:Date,
        default:null
    },
    "isDeleted" : {
        type : Boolean,
        default : false
    },
    "publishedAt" : {
        type:Date,
        default:null
    },
    "isPublished" : {
        type : Boolean,
        default : false
    }

}
, {timestamps : true})

module.exports = mongoose.model('blogProject1', blogSchema);