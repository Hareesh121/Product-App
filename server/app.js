const express =require('express');
 const ProductData = require('./src/model/ProductData');
 const User = require('./src/model/user')
const jwt= require('jsonwebtoken')
 const cors = require('cors');
 var bodyparser = require('body-parser');
 var app = new express();
 app.use(cors());
 app.use(bodyparser.json())



 function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token ==='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}
 
 app.get('/products',verifyToken,(req,res)=>{
     res.header("Access-Control-Allow-Origin","*")
     res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION");
 ProductData.find()
 .then(function(products){
     res.send(products);
 });
// res.send("Hello mongo");
    });
    app.post('/insert',verifyToken,function(req,res){
        res.header("Access-Control-Allow-Origin","*")
   res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
   console.log(req.body);
   var product ={
       productId:req.body.product.productId,
       productName:req.body.product.productName,
       productCode:req.body.product.productCode,
       releaseDate:req.body.product.releaseDate,
       description:req.body.product.description,
       price:req.body.product.price,
       starRating:req.body.product.starRating,
       imageUrl:req.body.product.imageUrl
   }
   var product = new ProductData(product);
   product.save()
   .then(function(product){
       res.send(product)
   })
    });

app.put('/edit',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
   res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
//    console.log(req.body);
//    product.findANd(req.body._id,(err,product)=>{
    //    if(err)
    const id =req.body.product._id
    //    res.status(500).json({errmsg:err});
       var product ={
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl
    }

    console.log(product)
    // var product = new ProductData(product);
    // product.save();

    ProductData.findByIdAndUpdate(id,{$set:product},(err,doc)=>
    {
        if(!err){res.send(doc)}
        else{console.log("Error")}
    })

   })






   app.delete('/delete/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    // var id=req.params.id;
    console.log(req.params.id);
   
   ProductData.findByIdAndDelete(req.params.id,(err,doc)=>{
       if(!err){res.send(doc)}
       else{console.log("Error")}
   })
            
   
})











app.post('/register',(req,res)=>{
    let userData =req.body;
    let user = new User(userData)
    user.save((err,registeredUser)=>{
        if(err){
            console.log(err);
        }
        else{
            let payload={subject:user._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})

            // res.status(200).send(registeredUser)
        }
    })
})

app.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            comsole.log(err)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }else
            if(user.password !== userData.password){
                res.status(401).send('Invalid Password')

            }else{
                let payload={subject:user._id}
                let token = jwt.sign(payload,'secretKey')
                res.status(200).send({token})
    
                // res.status(200).send(user)
            }
        }
    })
})







    app.listen(3000,function(){
        console.log("listening to the port 3000");
    });
