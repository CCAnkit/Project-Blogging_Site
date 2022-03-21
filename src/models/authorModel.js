const mongoose = require('mongoose');

 const authorSchema = new mongoose.Schema({
     "fname" : {
         type : String,
         required : 'First name is required',
         trim : true
     },
     "lname" : {
        type : String,
        required : 'Last name is required',
        trim : true
    },
    "title" : { 
        type : String,
        required : 'title is required',
        enum : ['Mr', 'Mrs', 'Miss'],
        trim : true
    },
    "email" : {
        type : String, 
        required : 'email is required',
        unique : true,
        lowercase : true,
        trim:true,
        validate : {
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message:'Email is invalid, Please check your Email address.', isAsync:false
        }
    },
    "password" : {
        type : String,
        required : 'password is required',
        trim : true
    }
}
, {timestamps : true})

module.exports = mongoose.model('authorProject1', authorSchema);