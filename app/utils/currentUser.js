let getUsers = () => {
    return {
        data: [
            {
                "id": 1,
                "name": "Sachin Karia",
                "inbox": [
                            {
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
                    }
                ]
            }
        ]
    }
};

module.exports = getUsers();