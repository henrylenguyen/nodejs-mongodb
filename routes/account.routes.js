const express = require("express");
const router = express.Router();
const AccountModel = require("../models/account.model");
// Lấy dữ liệu từ db

router.get("/",(req,res,next)=>{
  let page  = req.body.soTrang;
  let PAGE_SIZE = req.body.SoPhanTuTrenTrang;
  if(page){
    // Lấy theo phân trang
    if(page<1){
      page=1;
    }
    page = parseInt(page);
    let soLuongBoQua = (page-1)*PAGE_SIZE;
    AccountModel.find({})
    .skip(soLuongBoQua)
    .limit(PAGE_SIZE)
    .then(data=>{
      AccountModel.countDocuments({}).then((total)=>{
        let tongSoTrang = Math.floor(total/PAGE_SIZE)
        res.json({
          tongSoTrang: tongSoTrang,
          data:data
        })

      })
    })
    .catch(err=>{
      res.json("Lỗi")
    })
  }
  else{
    AccountModel.find({})
    .then(data=>{
      res.json(data)
      
    })
    .catch(err=>{
      res.json("Lỗi")
    })
  }
})


// Lấy 1 dữ liệu từ db

router.get("/:id",(req,res,next)=>{
  const id = req.params.id;
  AccountModel.findById(id)
  .then(data=>{
    res.json(data)
  })
  .catch(err=>{
    res.json("Lỗi")
  })
})


// Gửi dữ liệu vào db

router.post("/",(req,res,next)=>{
  const username = req.body.username;
  const password = req.body.password;
  AccountModel.findOne({
    username:username
  }).then((data)=>{
    if(data){
      res.json("Username đã tồn tại")
    }else{
     return AccountModel.create({
        username:username,
        password:password
      })
    }
  }).then(data=>{
    res.json("Thêm mới thành công")
  }).catch(err=>{
    res.json("Lỗi")
  })
})


// Cập nhật dữ liệu

router.put("/:id",(req,res,next)=>{
  var id = req.params.id;
  var password = req.body.password;
  AccountModel.findByIdAndUpdate(id,{
    password:password
  }).then(data=>{
    res.json("Cập nhật thành công")
  }).catch(err=>{
    res.json("Lỗi")
  })
})

// Xóa dữ liệu trong db

router.delete("/:id",(req,res,next)=>{
  const id = req.params.id;
  AccountModel.deleteOne({
    _id:id
  }).then(data=>{
    res.json("Xóa thành công")
  }).catch(err=>{
    res.json("Lỗi")
  })
})

module.exports = router;