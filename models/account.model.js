const url = "mongodb+srv://thailnp133:admin123@movie-ticket.djsbdjv.mongodb.net/LearnMongo"

// Using Node.js `require()`


const mongoose = require('mongoose');
mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected!'));

  const Schema = mongoose.Schema;


 // Khung suờn của data, để ràng buộc dữ liệu
 const accountSchema = new Schema({
  // _id sẽ tự động có
  username: String,
  password: String,
  card: String,
  list_course:{
    course: String
  }
},{
  collection: "Account"
});

// tên + schema
const AccountModel = mongoose.model("account",accountSchema);

module.exports = AccountModel;