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
                                    "fromMe": "false"},
                                    {"username": "Sachin Karia",
                                        "message": "Hello there!",
                                        "fromMe": "true"},
                                    {"username": "Sachin K",
                                        "message": "Hello there!",
                                        "fromMe": "true"},
                                    {"username": "Maxyboi",
                                        "message": "Hello there!",
                                        "fromMe": "false"}
                                ]
                    }
                ]
            }
        ]
    }
};

module.exports = getUsers();