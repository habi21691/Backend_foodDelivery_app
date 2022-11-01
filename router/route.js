const express = require("express");
const router = express.Router();
const Food_store = require("../model/Food_Store");
const multer = require("multer");
const fs = require("fs");

const {
  signin,
  signup,
  auth,
  forgot_password,
} = require("../controller/auth.controller");
const orderTableCopy = require("../model/UserOrderModel");
const user = require("../model/UserModel");
const Contact = require("../model/contactModel")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // console.log(file.originalname)
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,

}).single("file");

router.post("/imageUpload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      const product = new Food_store({
        catagories: req.body.catagories,
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        name: req.body.name,
      });
      product
        .save()
        .then((result) => {
          res.status(200).json({ message: "Created product successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
      // return res.status(200).send(req.file)
    }
  });

  // res.send("image upload successfull")
});

router.get("/uploadedProduct", (req, res, next) => {
  Food_store.find()
    .select("name price _id image ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        product: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            image: doc.image,
            _id: doc._id,
            request: {
              type: "GET",
              url: "https://mernfood-delivery.onrender.com/api/product" + doc._id,
            },
          };
        }),
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/image/:filename", (req, res) => {
  // console.log(req)
  var filePath = "./upload/" + req.params.filename;
  var stat = fs.statSync(filePath);

  console.log(stat.type);
  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": stat.size,
  });

  var readStream = fs.createReadStream(filePath);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
});
//user Registration route
router.post("/Register", signup);

//routing user data
router.post("/Signin", signin);
router.get("/auth/:token", auth);
router.post("/forgot_password", forgot_password);

router.post("/Ordering", (req, res) => {
  // console.log(req);
  try {
    
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      const Order = new orderTableCopy({
        fullname: req.body.fullname,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        name: req.body.name,
        amount: req.body.amount,
        image: req.file.filename,
        date: req.body.date,
        status: req.body.status,
      });

      Order.save()
        .then((data) => {
          return res.status(200).json((message = "successfully ordered "));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  })
} catch (error) {
    return ;
}
});

router.post("/TakeOrdering", (req, res) => {
  
  const Order = new orderTableCopy({
    fullname: req.body.fullname,
    address: req.body.address,
    phonenumber: req.body.phonenumber,
    name: req.body.name,
    amount: req.body.amount,
    
    date: req.body.date,
    status: req.body.status,
  });

  Order.save()
    .then((data) => {
      return res.status(200).json((message = "successfully ordered "));
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//Contact Api
router.get('/contact', (req, res) => {
  const contactMessage = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })
 contactMessage.save()
 .then( (data) => {
  return res.status(200).json("successfully order")
 }).catch( (error) => {

  console.log(error)
 })

})

router.get("/feachingOrder", (req, res) => {
  orderTableCopy
    .find()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err.message);
    });
});

router.get("/userCheck", (req, res) => {
  user
    .find({ role: "Delivery" })
    .then((resp) => {
      // console.log(resp)
      return res.status(200).json(resp);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

// router.get('/uploaded/:filename',getImage)
router.post("/givingTask", (req, res) => {
  // console.log(req)
  orderTableCopy
    .updateOne(
      { _id: req.body.order_id },
      // req.body.order_id,
      { $set: { deliver_boy: req.body.delivery_boy } },
      { upsert: true }
    )
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});
// Editing Customer Orders

router.put("/EditingOrder/:_id", (req, res, next) => {
  // console.log(req.query);
  // var _id = req.params._id;
  console.log(req.body);
  orderTableCopy
    .updateOne(
      { _id: req.params._id },
      {
        $set: {
          name: req.body.data.name,
          amount: req.body.data.amount,
        },
      }
    )
    .then((err) => {
      res.status(200).json({
        message: "update success",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
//tasks of the delevery boys
router.get("/oderedTaskForDelivery/:deliver_boy", (req, res) => {
  orderTableCopy
    .find({ deliver_boy: req.params.deliver_boy })
    .then((data) => {
      // console.log(req.params)
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});
router.get("/featchinForSearch", (req, res) => {
  Food_store.find()
    .select("name")
    .exec()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.get("/deleteOrder/:_id", (req, res) => {
  // console.log(req)
  orderTableCopy
    .findByIdAndDelete({ _id: req.params._id })
    .exec()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;
