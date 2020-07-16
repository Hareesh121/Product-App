const mongoose =require('mongoose');
mongoose.connect("mongodb+srv://user_hareesh:Charmcaster@mycluster.zfaab.azure.mongodb.net/ProductDb?retryWrites=true&w=majority");
const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    // _id:String,
    productId:Number,
    productName:String,
    productCode:String,
    releaseDate:String,
    description:String,
    price:Number,
    starRating:Number,
    imageUrl:String
});

module.exports = mongoose.model('ProductData',NewProductSchema,'products');

