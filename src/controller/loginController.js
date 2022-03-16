const jwt = require('jsonwebtoken');
const authorModel = require('../models/authorModel.js');

const login = async function(req, res){
    try{
        let authorData = req.body
        const userName = authorData.email
        const password = authorData.password
        let authorCred = await authorModel.findOne({ email: userName, password: password});
        if (!authorCred)
          return res.status(400).send({
            status: false,
            msg: "Username or Password is not correct",
          })
        
          let token = jwt.sign(
            {
              authorId : authorCred._id.toString()
            },
            "project for blogs"
          );
          res.setHeader("x-api-key", token);
          res.send({ status: true, data: token });
    }
    catch (errorFound) {res.status(500).send({status:false, msg : errorFound.message})}
  };

  module.exports.login = login;