var friendsData = require("../data/friends");

module.exports = function (app) {


    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });


    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        var userData = req.body;
        var userScores = userData.scores;
        console.log(userData);
        console.log(userScores);

        var totalDifference;

        for (var i in friendsData) {
            var currentFriend = friendsData[i];
            totalDifference = 0;

            console.log(currentFriend.name);
            console.log(currentFriend.scores.length);

            for (var j in currentFriend.scores) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= bestMatch.friendDifference) {

                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        friendsData.push(userData);

        res.json(bestMatch);

    });

};