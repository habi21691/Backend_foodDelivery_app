var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../model/UserModel");

exports.signup = (req, res) => {
  
  const user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    phone_number: req.body.phone_number,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    } else {
      res.status(200).send({
        message: "User Registered successfully",
      });
    }
  });
};

exports.signin = (req, res) => {
  // console.log(req.body.data.username); it for the app 
 
    User.findOne({
      // username: req.body.data.username, for the app
      username: req.body.username,

    }).exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }

      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }

      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        // req.body.data.password, for the app

        user.password
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      //signing token with user id
      user.token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          fullname: user.fullname,
          phone_number: user.phone_number,
          role: user.role,
        },
        "This_is_very_secret_string",
        {
          expiresIn: 86400,
        }
      );

      //responding to client request with user profile success message and  access token .
      res.status(200).send({
        user: {
          id: user._id,
          username: user.username,
          fullname: user.fullname,
          role: user.role,
        },
        message: "Login successfull",
        accessToken: user.token,
      });
    });
 
};

exports.auth = (req, res) => {
  if (!req.params.token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(req.params.token, "This_is_very_secret_string");
    // req.user = decoded;
    res.status(200).json(decoded);
    ``;
    // const user = jwt.verify(
    //   refreshToken,
    //   "hello_delivery");
    // req.user = user
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

exports.forgot_password = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
