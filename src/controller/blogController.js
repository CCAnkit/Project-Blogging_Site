const blogModel = require('../models/blogModel.js');
const authorModel = require('../models/authorModel.js');

const blog = async function (req, res){
    try{
        const blogDetails = req.body
        const id = blogDetails.authorId
        if (!blogDetails.title) {return res.status(400).send({status:false, msg:"title is required"})}
        if (!blogDetails.body) {return res.status(400).send({status:false, msg:"body is required"})}
        if (!blogDetails.catagory) {return res.status(400).send({status:false, msg:"catagory is required"})}
        if (!blogDetails.authorId) {return res.status(400).send({status:false, msg:"authorId is required"})}
        const validate = await authorModel.findById(id)  //check valid author id
        if(!validate) {
            return res.status(400).send({status:false, msg:"invalid authorId"})
        }
        const data = await blogModel.create(blogDetails)
        console.log("data saved successfully")
        res.status(201).send({status:true, data:data})  
    }
    catch(error){ res.status(500).send({status:false, msg:error.message})}               
}

const getBlog = async function (req, res){
    try{
            let qwery = req.query
            let filter = {
                isDeleted: false,
                isPublished: true,
                ...qwery
            };
            const filterByQuery = await blogModel.find(filter)
            if(filterByQuery.length == 0){
                return res.status(404).send({status:false, msg:"no blog found"})
            }
            console.log("data fetched successfully")
            res.status(201).send({status:true, data:filterByQuery})
    }
    catch(error){ res.status(500).send({status:false, msg:error.message})}
}

const editBlog = async function(req, res){
    try{
        const blogId = req.params.blogId
        const Details = req.body
        const validId = await blogModel.findById(blogId)
        if (!validId){
            return res.status(400).send({status:false, msg:"blog Id invalid"})
        }
        const updatedDetails = await blogModel.findOneAndUpdate(
            {_id : blogId},
            {title : Details.title, body : Details.body, tags : Details.tags,
            subcategory : Details.subcategory, isPublished : true, publishedAt : new Date()},
            {new : true, upsert : true})
        res.status(201).send({status:true, data:updatedDetails})
    }
    catch(error){ res.status(500).send({status:false, msg:error.message})}
}

const deleteBlogById = async function(req, res){
    try{
        const blogId = req.params.blogId
        const validId = await blogModel.findById(blogId)
        if (!validId){
            return res.status(400).send({status:false, msg:"blog Id invalid"})
        }
 
        const deletedDetails = await blogModel.findOneAndUpdate(
            {_id : blogId},
            {isDeleted : true, deletedAt : new Date()},
            {new : true})
        res.status(201).send({status:true, data:deletedDetails})
    }
    catch(error){ res.status(500).send({status:false, msg:error.message})}
}

const deleteBlogByQuery = async function(req, res){
    try{
        let qwery = req.query
        let filter = {...qwery}
        const filterByQuery = await blogModel.find(filter)
        if(filterByQuery.length == 0){
            return res.status(404).send({status:false, msg:"no blog found to delete"})
        }
        const deletedDetails = await blogModel.findOneAndUpdate(
            filter,
            {isDeleted : true, deletedAt : new Date()},
            {new : true})
        res.status(201).send({status:true, data:deletedDetails})
    }
    catch(error){ res.status(500).send({status:false, msg:error.message})}
}

const getAllBlogs = async function (req, res){
    const details = await blogModel.find()
    res.send({msg : details})
}

module.exports.blog = blog
module.exports.getBlog = getBlog
module.exports.editBlog = editBlog
module.exports.deleteBlogById = deleteBlogById
module.exports.deleteBlogByQuery = deleteBlogByQuery
module.exports.getAllBlogs = getAllBlogs