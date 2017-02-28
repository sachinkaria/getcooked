var getUserInfo = () => {
    return {
        data: [
            {
            "firstname": "Sachin",
            "surname": "Karia",
            "Endorsements": ["Indian", "Weddings", "Deserts"],
            "Rating": 5
                },
            {
                "firstname": "Jonny",
                "surname": "Ive",
                "Endorsements": ["Italian", "Cocktails", "Burgers"],
                "Rating": 5
            },
            {
                "firstname": "Jeremy",
                "surname": "Clarkson",
                "Endorsements": ["Breakfast", "Bread", "Lobster"],
                "Rating": 5
            }
        ]
    };
}

module.exports = getUserInfo();