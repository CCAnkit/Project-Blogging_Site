const authorModel = require('../models/authorModel.js');

const author = async function (req, res){
    try{
        const details = req.body
        if (!details.fname) {return res.status(400).send({status:false, msg:"First name is required"})}  //Firstname is mandory 
        if (!details.lname) {return res.status(400).send({status:false, msg:"Last name is required"})}  //Last name is mandory
        if (!details.title) {return res.status(400).send({status:false, msg:"Title is required"})}  //Title is mandory
        if (!details.email) {return res.status(400).send({status:false, msg:"Email is required"})}   //Email is mandory
        if (!details.password) {return res.status(400).send({status:false, msg:"Password is required"})}  //Password is mandory
      
        const validateEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details.email))  //Regex for checking the valid email format 
        if (!validateEmail){
            return res.status(400).send({status:false, msg:"Email is invalid, Please check your Email address."})   //email address checking
        }

        const data = await authorModel.create(details)  //creating the author details
        console.log("Data saved successfully")
        res.status(201).send({status: true, msg : data}) //enum will be handel
    }
    catch(err){
        res.status(500).send({status:false, error : err.message})
    }               
}

module.exports.author = author