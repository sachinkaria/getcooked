let getUser;
getUser = () => {
    return {
        data: [
            {
                "id": 1,
                "name": "Sachin Karia",
                "messages": [
                    {
                        "unread": [
                            {
                                "from": "Canababes",
                                "message": "Yooooo, whats up! So this is basically going to be the message that I send you",
                                "date": "2017-04-23T18:25:43.511Z"
                            }
                        ],
                        "read": [
                            {
                                "from": "Danny's Food Truck",
                                "message": "Yooooo, whats up! So this is basically going to be the message that I send you",
                                "date": "2017-04-23T18:21:43.541Z"
                            },
                            {
                                "from": "WingerDinner",
                                "message": "Yooooo, whats up! So this is basically going to be the message that I send you",
                                "date": "2017-04-23T18:22:4.511Z"
                            },
                            {
                                "from": "Canababes",
                                "message": "Yooooo, whats up! So this is basically going to be the message that I send you",
                                "date": "2017-04-23T18:23:43.531Z"
                            }
                        ]
                    }
                ]
            }
        ];
    }
};

module.exports = getUser;