const authorModel = require('../models/authorModel.js');

const author = async function (req, res){
    try{
      const details = req.body
      if (!details.fname) {return res.status(400).send({status:false, msg:"first name is required"})}
      if (!details.lname) {return res.status(400).send({status:false, msg:"last name is required"})}
      if (!details.title) {return res.status(400).send({status:false, msg:"title is required"})}
      if (!details.email) {return res.status(400).send({status:false, msg:"email is required"})}
      if (!details.password) {return res.status(400).send({status:false, msg:"password is required"})}
      const validateEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details.email))
        if (!validateEmail){
            return res.status(400).send({status:false, msg:"email invalid"})
        }
        const data = await authorModel.create(details)
        console.log("Data saved successfully")
        res.status(201).send({status:true, msg : data})  
    }
    catch(error){ res.status(500).send({status:false, error : error.message})}               
}

module.exports.author = author