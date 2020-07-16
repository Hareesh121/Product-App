const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user_hareesh:Charmcaster@mycluster.zfaab.azure.mongodb.net/ProductDb?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:String,
    password:String
})
module.exports=mongoose.model('user',userSchema,'users');