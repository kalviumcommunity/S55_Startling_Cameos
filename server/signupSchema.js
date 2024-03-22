const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    username: String,
    password:String
});
const UserModel = mongoose.model("user", signupSchema);
// console.log(UserModel)
module.exports = {UserModel};