const mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var bcrypt  = require('bcrypt');
var User = require('../model/user');



try {
    mongoose.connect("mongodb://localhost:27017/nodedb",{
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  };


var signup = (req,res)=>{   
  let fullName  = req.body.fullName;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password,8);
  let role  = req.body.role;

  const user = new User({
    fullName: fullName,
    email:email,
    role:role,
    password:password
  });

  user.save().then(data => {
    return res.status(200).send("user registration succefully");

  }).catch(err =>{
    return res.status(500).send("user registration failed");
  });
};

var signin = (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        email:email
    }).then((user) => {
      var passwordIsValid = bcrypt.compareSync(password,user.password);
       if(!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "inavalid password"
        });
    }
    var token = jwt.sign({
         id: user.id
    }, process.env.API_SECRET,{
        expiresIn:86400
    } );
    return res.status(200).send({
        user:{
            user:user._id,
            email:user.email,
            fullName:user.fullName,
        },
        message: 'login has been seccessfull',
        accessToken: token
    });
           
    
    }).catch(err =>{
        if(err) {
            return res.status(500).send({
                message:err
            });
        }
    });
};



module.exports= {signin,signup};
