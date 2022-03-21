const authorModel = require('../models/authorModel.js');

const isValidValue = function(value){   //it should not be like undefined or null.
    if (typeof value === 'undefined' || value === null) return false   //if the value is undefined or null it will return false.
    if (typeof value === 'string' && value.trim().length === 0) return false   //if the value is string & length is 0 it will return false.
    return true
}

const isValidTitle = function(title){    
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1     //enum validation
}

const isValidDetails = function(details){   
    return Object.keys(details).length > 0
}

const author = async function (req, res){
    try{
        const details = req.body
        if(!isValidDetails(details)){
            res.status(400).send({status:false, msg:"Please provide author details"})  //Validate the value that is provided by the Client.
        }
        const {fname, lname, title, email, password} = details
        if (!isValidValue(fname)){
            return res.status(400).send({status:false, msg:"please provide first name"})   //FirstName is mandory 
        }
        if (!isValidValue(lname)){
            return res.status(400).send({status:false, msg:"please provide last name"})   //LastName is mandory
        }
        if (!isValidValue(title)){
            return res.status(400).send({status:false, msg:"please provide title"})    //Title is mandory
        }
        if (!isValidValue(email)){
            return res.status(400).send({status:false, msg:"please provide email"})   //Email is mandory
        }
        if (!isValidValue(password)){
            return res.status(400).send({status:false, msg:"please provide password"})    //Password is mandory
        }
        if (!isValidTitle(title)){
            return res.status(400).send({status:false, msg:"title should be Mr, Miss or Mrs"})   //Enum handeling
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return res.status(400).send({status:false,msg:"please provide valid email"})    //Regex for checking the valid email format 
        }
        const emailUsed = await authorModel.findOne({email})
        if(emailUsed){
            return res.status(400).send({status:false, msg:`Email Id ${email} already exists`})   //checking the email address checking
        }
        const data = await authorModel.create(details)  //creating the author details
        res.status(201).send({status: true, msg : "Author created and details saved successfully", data:data})
    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false, msg : err.message})
    }               
}

module.exports.author = author