var express = require('express')
var app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors')

app.use(cors())

app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/crud',function(){
    console.log("connected")
});
const Schema = mongoose.Schema;
var url = require('url');
var qs = require('qs');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var userSchema = new Schema({
    user_name: String,
    age: String,
    gender: String,
    email: String,
    phone: String
});

var productSchema = new Schema({
    user_name: String,
    product_name: { type: String, unique: true }
});

var credentialsSchema = new Schema({
    user_name: { type: String, unique: true },
    password: String
});

var User = mongoose.model("Users", userSchema);
var Product = mongoose.model("Products", productSchema);
var Credential = mongoose.model("Credencial", credentialsSchema);


app.post('/create_user',urlencodedParser, function (req, res) {
    var user = new User({
        user_name: req.body.user_name,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone
    });

    user.save(function(error) {
        console.log("User has been saved!");
        if (error) {
            console.error(error);
        }
    });
    res.send('User has been saved!');
});

app.post('/create_product', urlencodedParser, function (req, res) {

    var product = new Product({
        user_name: req.body.user_name,
        product_name: req.body.product_name
    });

    product.save(function(err) {
        console.log("product has been saved!");
        if (err) {
            console.log(err)
        }
    });
    res.send(JSON.stringify(product));
});

app.put('/update_product/:productId/:user_name/:product_name', function (req, res) {


    var product = new Product({
        user_name: req.params.user_name,
        product_name: req.params.product_name
    });

    Product.findOne({_id: req.params.productId}).exec((err, result) => {
        if (result) {
            result.user_name = req.params.user_name;
            result.product_name = req.params.product_name;
            result.save((err) => {
                if (err){} // do something
                    });
        }
        //If you don't find the product for some reason, do something
    })
    });

    app.post('/create_user_credentials', urlencodedParser, function (req, res) {

    var credential = new Credential({
        user_name: req.body.user_name,
        password: req.body.password
    });

    credential.save(function(error) {
        console.log("user credentials has been saved!");
        if (error) {
            console.error(error);
        }
    });

    res.send({msg:"user credentials has been saved!"});
});

app.get('/get_users', function (req, res) {
    User.find({},function(err,response){
        console.log(response);
        res.send(response);
    });
});

app.get('/get_user/:user_name', function (req, res) {
    User.find({user_name:req.params.user_name},function(err,response){
        console.log(response);
        res.send(response);
    });
});
app.get('/login/:user_name/:password', function (req, res) {
    Credential.findOne({user_name:req.params.user_name},function(err,response){
        if(response.password==req.params.password){
            res.send({msg:'success', user_name:response.user_name});
        }
        else res.send('failure');
    });
});

app.get('/get_product/:user_name', function (req, res) {
    Product.find({user_name:req.params.user_name},function(err,response){
        console.log(response);
        res.send(response);
    });
});

//search
app.get('/get_product/:product_name', function (req, res) {
    Product.find({product_name:req.params.product_name},function(err,response){
        console.log(response);
        res.send(response);
    });
});

app.get('/get_products', function (req, res) {
    Product.find({},function(err,response){
        console.log(response);
        res.send(response);
    });
});

app.delete('/delete_user/:user_name', function (req, res) {
    console.log(req.params.user_name);
    User.deleteOne({ user_name: req.params.user_name }, (err) => {
        res.status(200).send('user has been deleted');
    });
});

app.delete('/delete_product/:product_name', function (req, res) {
    console.log(req.params.product_name);
    Product.deleteOne({ product_name: req.params.product_name }, (err,response) => {

    });
    res.status(200).send({msg:'product has been deleted'});
});

app.listen(3001,function(){
    console.log('app is listening')
});