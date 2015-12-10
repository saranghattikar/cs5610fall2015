/**
 * Created by SarangPC on 11/12/2015.
 */
require('body-parser');
var yelp = require("node-yelp");
module.exports = function (app,reviewmodel,appdb) {
    app.get("/api/project/search", getRestaurants);
    app.get("/api/project/res/:id", getResById);
    app.post("/api/project/rev",addReview);
    app.get("/api/project/reviews/:id", getreviews);
    app.get("/api/project/initialsearch",getinitialrestaurants);

    console.log("Hello from review in project");

    var client = yelp.createClient({
        oauth: {
            "consumer_key": "BjtYVmxNDzdj9maPQFt0Lg",
            "consumer_secret": "0naDjBLXz9PSmFV910xE5BkRPew",
            "token": "FXqu8pr53XFT8t09JMfBa4uD8-NITaPx",
            "token_secret": "-9jopLL6nqP-NGnHBPeVO5cv-_k"
        },

        // Optional settings:
        httpClient: {
            maxSockets: 25  // ~> Default is 10
        }
    });

    function getreviews(req, res){
        console.log(req.params.id);
        reviewmodel
            .getreviews(req.params.id)
            .then(function (reviews) {
                res.json(reviews);
            }, function(err){
                res.json(err);
            });
    }

    function addReview(req, res) {
        var review = req.body;
        reviewmodel
            .Create(review)
            .then(function (user) {
                res.json(user);
            }, function(err){
                res.json(err);
            });
    };




    function getRestaurants(req, res) {
        var terms = req.query.terms;
        var location = req.query.location;
        //console.log("in server");
        //console.log(terms);
        //console.log(location);

        client.search({ terms:terms, location:location, actionlinks:true}).then(function (data) {
            //console.log(data);
            var businesses = data.businesses;
            var location = data.region;
            res.json(businesses);
        });

    }

    function getinitialrestaurants(req, res){
        var latd = req.query.latd;
        var lngtd = req.query.lngtd;
        var query = latd+','+lngtd;
        console.log(query);
            client.search({ terms:'food',cll:latd, actionlinks:true}).then(function (data) {
                //console.log(data);
                var businesses = data.businesses;
                var location = data.region;
                res.json(businesses);
            });

    }

    function getResById(req, res) {
        //console.log(req.params.id);
        var id= req.params.id;
        var dbreviews =[];
        var yelpreview=[];

        reviewmodel
            .FindByResId(id)
            .then(function (reviews) {
                dbreviews=reviews;
                //console.log(reviews)
                //res.json(users);
            });



        client.business(id).then(function (data) {
            //console.log(data);
            //var businesses = data.businesses;
            //var location = data.region;
            yelpreview = data.reviews;
            yelpreview.concat(dbreviews);

            for (var i = 0; i < dbreviews.length; i++) {
                yelpreview.push(dbreviews[i]);
            }
            console.log(yelpreview);
            data.reviews.concat(dbreviews);
            res.json(data);
        });
    }





// See http://www.yelp.com/developers/documentation/v2/search_api
 /*   yelp.search({ term: 'food', location: 'Montreal' })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.error(err);
        });

// See http://www.yelp.com/developers/documentation/v2/business
    yelp.business('yelp-san-francisco')
        .then(console.log)
        .catch(console.error);

    yelp.phoneSearch({ phone: '+15555555555' })
        .then(console.log)
        .catch(console.error);

// A callback based API is also available:
    yelp.business('yelp-san-francisco', function(err, data) {
        if (err) return console.log(error);
        console.log(data);
    });*/
};
