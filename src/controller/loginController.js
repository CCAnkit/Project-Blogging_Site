const jwt = require('jsonwebtoken');
const authorModel = require('../models/authorModel.js');

const login = async function(req, res){
    try{
        let authorData = req.body
        const userName = authorData.email
        const password = authorData.password
        let authorEmail = await authorModel.findOne({ email: userName});
        if (!authorEmail)
          return res.status(400).send({
            status: false,
            msg: "username is not correct",
          })

          let authorpass = await authorModel.findOne({password: password});   
        if (!authorpass)
          return res.status(400).send({
            status: false,
            msg: "password is not correct",
          })
        
          let token = jwt.sign(
            {
              authorId : authorEmail._id.toString()
            },
            "project for blogs"
          );
          res.setHeader("x-api-key", token);
          res.send({ status: true, data: token });
    }
    catch (errorFound) {res.status(500).send({status:false, msg : errorFound.message})}
  };

  module.exports.login = login;