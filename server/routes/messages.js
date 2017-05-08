const AuthenticationController = require('../controllers/authentication'),
    express = require('express'),
    passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
// inbox
    app.get('/inbox', requireAuth, (req, res) => {
        res.json({ "inbox":[{   "id": "1234",
            "username": "Maxyboi",
            "chatMessages": [
                {"username": "Maxyboi",
                    "message": "Hello there!",
                    "fromMe": false,
                    "created": "2012-04-23T18:25:40.511Z"},
                {"username": "Sachin Karia",
                    "message": "Hello Maxiboy!",
                    "fromMe": true,
                    "created": "2012-04-23T18:25:41.511Z"},
                {"username": "Sachin K",
                    "message": " How are you?d fhajkdhfklahkdfhaklj sdhfkjhalks dfhlaksdfhlkaj sdhfkj alskjdfhksajhdfkljashfda" +
                    "afdsafkds j dfhlaks dfhjkasldfhkjlsahdfkl hadsjfahklas dfhlka dhskflhaskldfahklsjd fklasdfhjsa fhljkads    ",
                    "fromMe": true,
                    "created": "2012-04-23T18:25:43.111Z"},
                {"username": "Maxyboi",
                    "message": "The entire menu is vegetarian",
                    "fromMe": false,
                    "created": "2012-04-23T18:25:47.511Z"}
            ]
        },
            {   "id": "3434",
                "username": "Voss the boss",
                "chatMessages": [
                    {"username": "Voss the boss",
                        "message": "Hello there!",
                        "fromMe": false,
                        "created": "2012-04-23T18:25:40.511Z"},
                    {"username": "Sachin Karia",
                        "message": "Hello Maxiboy!",
                        "fromMe": true,
                        "created": "2012-04-23T18:25:41.511Z"},
                    {"username": "Sachin K",
                        "message": " How are you?d fhajkdhfklahkdfhaklj sdhfkjhalks dfhlaksdfhlkaj sdhfkj alskjdfhksajhdfkljashfda" +
                        "afdsafkds j dfhlaks dfhjkasldfhkjlsahdfkl hadsjfahklas dfhlka dhskflhaskldfahklsjd fklasdfhjsa fhljkads    ",
                        "fromMe": true,
                        "created": "2012-04-23T18:25:43.111Z"},
                    {"username": "Voss the boss",
                        "message": "The entire menu is vegetarian",
                        "fromMe": false,
                        "created": "2012-04-23T18:25:47.511Z"}
                ]
            }
        ]})
    });
};