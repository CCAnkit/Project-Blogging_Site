const jwt = require('jsonwebtoken');
const authorModel = require('../models/authorModel.js');

const isValidValue = function(value){    //it should not be like undefined or null.
  if (typeof value === 'undefined' || value === null) return false    //if the value is undefined or null it will return false.
  if (typeof value === 'string' && value.trim().length === 0) return false    //if the value is string & length is 0 it will return false.
  return true
}

const login = async function(req, res){
    try{
        let author = req.body
        const {email, password} = author
        if (!isValidValue(email)){
          return res.status(400).send({status:false, msg:"Please provide email"})   //Validate the value that is provided by the Client.
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          return res.status(400).send({status:false,msg:"Please provide valid email"})   //Regex for checking the valid email format
        }
        if (!isValidValue(password)){
            return res.status(400).send({status:false, msg:"Please provide password"})  //checks that the password is correct or not.
        }
        let authorCred = await authorModel.findOne({email, password});  //finding the email/password in the authors.
        if (!authorCred)
          return res.status(401).send({status: false, msg: "Username & Password is not correct, Please check your credentials again.",})
        
    //authentication starts

          let token = jwt.sign(   //creting the token for the authentication.
            {
              authorId : authorCred._id   //payload(details that we saved in this token)
            },
            "Project/blogs"  //secret key
          );
          res.setHeader("x-api-key", token);  //setting token to header
          res.send({ status: true, msg : "login successfull",data: token });  
    }
    catch (err) {
      res.status(500).send({status:false, msg : err.message})
    }
  }

  module.exports.login = login;