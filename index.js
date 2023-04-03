const express = require("express");
var app = express();
const port = 3000;
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//------------------------SỬ DỤNG MODEL-------------------------------------

const AccountModel = require("./models/account.model");



// ------------------------SỬ DỤNG ROUTES--------------------------------------

const accountRouter = require("./routes/account.routes");
app.use("/api/account",accountRouter);



//-------------------------------------------------------------------------------------------------------

// Đăng ký
app.post("/register", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  AccountModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        res.json("Username đã tồn tại");
      } else {
        return AccountModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => {
      res.json("Tạo tài khoản thành công");
    })
    .catch((err) => {
      res.status(500).json("Tạo tài khoản thất bại");
    });
});


// Đăng nhập
app.post("/login",(req,res,next)=>{
  var username = req.body.username;
  var password = req.body.password;
  console.log(username,password)
  AccountModel.findOne({
    username:username,
    password:password
  }).then(data=>{
    if(data){
      res.status(400).json("Đăng nhập thành công")

    }
    else{
      res.json("Đăng nhập thất bại")

    }
  }).catch(err=>{
    res.status(500).json("CÓ lỗi xảy ra")
  })
})
app.get("/", (req, res) => {
  res.json("Hello");
});





app.listen(port, () => {
  console.log(`App đang chạy trên cổng ${port}`);
});
