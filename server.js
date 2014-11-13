// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');   //call mongodb
var Food       = require('./models/food');
var FoodNutrition  = require('./models/food_nutrition');
var Nutrients       = require('./models/nutrients');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB connection
var db = mongoose.connect('mongodb://phoodie:ph00dieAdmin@troup.mongohq.com:10041/app21948504');

var port = process.env.PORT || 8080; 		// set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to phoodie! Good Luck and Good Bowling' });	
});

router.route('/food/:food_id')
.get(function(req,res){
    
    Food.findById(req.params.food_id, function(err,food){
        if(err){
            res.send(err);
        }
        else{
            res.json(food);
        }
    });
    
});

router.route('/food/group/:fdgrp_cd')
.get(function(req,res){
    
    Food.find({'fdgrp_cd':req.params.fdgrp_cd}, function(err,food){
        if(err){
            res.send(err);
        }
        else{
            res.json(food);
        }
    });
    
});

router.route('/food/desc/:shrt_desc')
.get(function(req,res){
    
    var query =  Food.find({'shrt_desc': new RegExp(req.params.shrt_desc,"i")});
    
    query.exec(function(err,food){
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            res.json(food);
        }
    });
    
});

router.route('/food/nutrition/:food_id')
.get(function(req,res){
    
    var foodNutritionQuery =  FoodNutrition.find({'ndb_no':req.params.food_id});
    
    foodNutritionQuery.exec(function(err,foodNutrition){
        if(err){
            res.send(err);
        }
        else{
            
            var nutritionIds = [];
            foodNutrition.forEach(function(element, index){
                nutritionIds.push(element['nutr_no']);
            });
            
            var nutrientQuery = Nutrients.find({'_id': { $in : nutritionIds }} );
            
            nutrientQuery.exec(function(err,nutrients){
                if(!err){
                    
                    var ingredients = [];
                    
                    foodNutrition.forEach(function(foodNutrient, index) {
                       
                       var ingredient = {};    
                       ingredient['food_detail'] = foodNutrient;
                       nutrients.forEach(function(nutrient,index){
                           if(nutrient['_id'] == foodNutrient['nutr_no']){
                               ingredient['nutrient'] = nutrient;
                           }
                       }); 
                       ingredients.push(ingredient);
                        
                    });
                    
                    res.json(ingredients);
                }
                   
            });
            
            
        }
    });
    
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
