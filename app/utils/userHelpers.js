var getUserInfo = () => {
    return {
        data: [
            {
                "id": 1,
            "firstname": "Sachin",
            "surname": "Karia",
            "endorsements": ["Indian", "Weddings", "Deserts"],
            "rating": 5
                },
            {
                "id": 2,
                "firstname": "Jonny",
                "surname": "Ive",
                "endorsements": ["Italian", "Cocktails", "Burgers"],
                "rating": 5
            },
            {
                "id": 3,
                "firstname": "Jeremy",
                "surname": "Clarkson",
                "endorsements": ["Breakfast", "Bread", "Lobster"],
                "rating": 5
            }
        ]
    };
}

module.exports = getUserInfo();