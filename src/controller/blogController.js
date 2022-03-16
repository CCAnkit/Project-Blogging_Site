const blogModel = require('../models/blogModel.js');
const authorModel = require('../models/authorModel.js');

const createBlog = async function (req, res){
    try{
        const blogDetails = req.body
        const id = blogDetails.authorId
        if (!blogDetails.title) {return res.status(400).send({status:false, msg: "Title is required"})}   //Firstname is mandory
        if (!blogDetails.body) {return res.status(400).send({status:false, msg: "Body is required"})}   //Last name is mandory
        if (!blogDetails.category) {return res.status(400).send({status:false, msg: "Category is required"})}  //Title is mandory
        if (!blogDetails.authorId) {return res.status(400).send({status:false, msg: "AuthorId is required"})}  //Email is mandory

        const validate = await authorModel.findById(id)   //finding by authorId
        if(!validate) {
            return res.status(400).send({status:false, msg:"AuthorId is invalid"})    //check valid authorId
        }
        const data = await blogModel.create(blogDetails)   //create blog
        console.log("Data saved successfully")
        res.status(201).send({status:true, data:data})  
    }
    catch(err){
    console.log(err)
    res.status(500).send({status:false, msg: err.message})
    }
}

const getBlog = async function (req, res){
    try{
            let qwery = req.query
            let filter = {
                isDeleted: false,     //store the condition in filter variable
                isPublished: false,
                ...qwery
            }
            // console.log(filter)

            const filterByQuery = await blogModel.find(filter)  //finding the blog by the condition that is stored in the fiter variable.
            if(filterByQuery.length == 0) {
                return res.status(404).send({status:false, msg:"No blog found"})
            }
            console.log("Data fetched successfully")
            res.status(201).send({status:true, data:filterByQuery})
    }
    catch(err) {
    console.log(err)
    res.status(500).send({status:false, msg: err.message})
    }
}

const updateBlog = async function(req, res){
    try{
        const blogId = req.params.blogId
        const Details = req.body
        const validId = await blogModel.findById(blogId)   //finding the blogId 
        if (!validId){
            return res.status(400).send({status:false, msg:"Blog Id is invalid"})   //check the blogId
        }
        const authorIdFromParam = req.params.authorId
        const authorIdFromBlog = validId.authorId.toString()    //change the authorId to string
        if (authorIdFromParam !== authorIdFromBlog) {          // for similar authorId from param & blogModel to update
            return res.status(401).send({status : false, msg : "This is not your blog, you can not update it."})
        }
        const updatedDetails = await blogModel.findOneAndUpdate(
            {_id : blogId},    //update the title, body, tage & subcategory.
            {title : Details.title, body : Details.body, tags : Details.tags,
            subcategory : Details.subcategory, isPublished : true, publishedAt : new Date()},
            {new : true, upsert : true})    //ispublished will be true and update the date at publishAt.
        res.status(201).send({status:true, data:updatedDetails})
    }
    catch(err) {
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
    }
}

const deleteBlogById = async function(req, res){
    try{
        const blogId = req.params.blogId
        const validId = await blogModel.findById(blogId)   
        if (!validId){
            return res.status(400).send({status:false, msg:"Blog Id is invalid"})
        }
        const authorIdFromParam = req.params.authorId
        const authorIdFromBlog = validId.authorId.toString()    //change the authorId to string
        console.log(authorIdFromBlog, authorIdFromParam)
        if (authorIdFromParam !== authorIdFromBlog) {          // for similar authorId from param & blogModel to delete
            return res.status(401).send({status : false, msg : "This is not your blog, you can not delete it."})
        }       //checks the authorId with the blogId that who is the owner of this blog.  
        const deletedDetails = await blogModel.findOneAndUpdate(
            {_id : blogId},
            {isDeleted : true, deletedAt : new Date()},
            {new : true})    //isDeleted will be true & update the date at deletedAt.
        res.status(201).send({status:true, data:deletedDetails})
    }
    catch(err) {
        console.log(err)
         res.status(500).send({status:false, msg: err.message})
    }
}

const deleteBlogByQuery = async function(req, res){
    try{
    let qwery = req.query
        let filter = {...qwery}
        const filterByQuery = await blogModel.find(filter)    //finding the blogId & return the array form with the data.
        console.log(filterByQuery)
        if(filterByQuery.length == 0){
            return res.status(404).send({status:false, msg:"No blog found to delete"})
        }    
        const authorIdFromParam = req.params.authorId
        for (let i=0; i<filterByQuery.length; i++){
            let authorIdFromBlog = filterByQuery[i].authorId.toString()   
            console.log(authorIdFromBlog)
            if (authorIdFromBlog == authorIdFromParam){     // for similar authorId from param & blogModel to delete
                const deletedDetails = await blogModel.findOneAndUpdate(
                    filter,
                    {isDeleted : true, deletedAt : new Date()},   //isDeleted will be true & update the date at deletedAt.
                    {new : true})   
                res.status(201).send({status:true, data:deletedDetails})
                break
            }else {
                return res.status(401).send({status : false, msg : "This is not your blog, you can not delete it."})
            }
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
        }
}
    



module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlogById = deleteBlogById
module.exports.deleteBlogByQuery = deleteBlogByQuery