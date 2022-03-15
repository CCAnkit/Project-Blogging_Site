const authorModel = require('../models/authorModel.js');

const author = async function (req, res){
    try{
      const authorDetails = req.body
      if (!authorDetails.fname) {return res.status(400).send({status:false, msg:"first name is required"})}
      if (!authorDetails.lname) {return res.status(400).send({status:false, msg:"last name is required"})}
      if (!authorDetails.title) {return res.status(400).send({status:false, msg:"title is required"})}
      if (!authorDetails.email) {return res.status(400).send({status:false, msg:"email is required"})}
      if (!authorDetails.password) {return res.status(400).send({status:false, msg:"password is required"})}
      const validateEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(authorDetails.email))
        if (!validateEmail){
            return res.status(400).send({status:false, msg:"email invalid"})
        }
        const data = await authorModel.create(authorDetails)
        console.log("data saved successfully")
        res.status(201).send({status:true, msg : data})  
    }
    catch(error){ res.status(500).send({status:false, error : error.message})}               
}

module.exports.author = author