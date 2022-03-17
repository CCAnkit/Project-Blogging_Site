const jwt = require('jsonwebtoken');
const authorModel = require('../models/authorModel.js');

const login = async function(req, res){
    try{
        let author = req.body
        const userName = author.email
        const password = author.password
        let authorCred = await authorModel.findOne({ email: userName, password: password});  //finding the email/password in the authors.
        if (!authorCred)
          return res.status(401).send({status: false, msg: "Username & Password is not correct, Please check your credentials again.",})
        
          let token = jwt.sign(   //creting the token for the authentication.
            {
              authorId : authorCred._id.toString()   //payload(details that we saved in this token)
            },
            "Project/blogs"  //secret key
          );
          res.setHeader("x-api-key", token);  //header name
          res.send({ status: true, data: token });  
    }
    catch (err) {
      res.status(500).send({status:false, msg : err.message})
    }
  }

  module.exports.login = login;