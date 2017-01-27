var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//GET ROUTES ----------------
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    var campgrounds = [
            {name: 'fish creek', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg'},
            {name: 'whatever', image: 'https://www.campamerica.co.uk/images/uploads/images/Private-Camp---Camp-Westmont-1400-x-610.png'},
            {name: 'Whatever name', image: 'http://www.topeducationdegrees.org/wp-content/uploads/2014/05/49.-River-Way-Ranch-Camp-%E2%80%93-Sanger-California.jpg'}
        ];
        //first campgrounds is name, second campgrounds is the data we are passing in.
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new.ejs');
});


//POST ROUTES ---------------

app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    console.log(req.body);
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('YelpCamp Server has started') 
});

