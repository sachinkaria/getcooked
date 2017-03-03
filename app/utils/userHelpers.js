var getUserInfo = () => {
    return {
        data: [
            {
                "id": 1,
            "firstname": "Sachin",
            "surname": "Karia",
            "endorsements": ["Indian", "Weddings", "Deserts"],
            "rating": 4,
                "imageUrl": "images/1.jpg"
                },
            {
                "id": 2,
                "firstname": "Jonny",
                "surname": "Ive",
                "endorsements": ["Italian", "Cocktails", "Burgers"],
                "rating": 5,
                "imageUrl": "images/2.jpg"
            },
            {
                "id": 3,
                "firstname": "Jeremy",
                "surname": "Clarkson",
                "endorsements": ["Breakfast", "Bread", "Lobster"],
                "rating": 4,
                "imageUrl": "images/3.jpg"
            },
            {
                "id": 4,
                "firstname": "Another",
                "surname": "Person",
                "endorsements": ["Tacos", "Guacamole", "Burritos"],
                "rating": 5,
                "imageUrl": "images/4.jpg"
            }
        ]
    };
}

module.exports = getUserInfo();