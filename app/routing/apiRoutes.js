
const friendData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {
        friendData.push(req.body);
        //res.json(friendData);

        let currentUserScores = [];

        for (let i = 0; i < req.body.scores.length; i++) {
            currentUserScores.push(parseInt(req.body.scores[i]));
        }

        let totalDifference = 0;

        let allTotalDiffs = [];

        let refSpot = 0;

        for (let j = 0; j < friendData.length - 1; j++) {

            totalDifference = 0;

            for (let i = 0; i < 10; i++) {
                totalDifference += Math.abs(friendData[j].scores[i] - currentUserScores[i]);
            }

            addToTotalDiffs();

        };

        function addToTotalDiffs() {
            allTotalDiffs.push({ totalDifference: totalDifference, referenceSpot: refSpot });
            refSpot++;
        };

        console.log(allTotalDiffs);

        let bestMatch = {
            totalDifference: 40,
            bestSpot: null
        };

        for (let k = 0; k < allTotalDiffs.length; k++) {
            if (allTotalDiffs[k].totalDifference < bestMatch.totalDifference) {

                bestMatch.totalDifference = allTotalDiffs[k].totalDifference;
                console.log(bestMatch.totalDifference);

                bestMatch.bestSpot = allTotalDiffs[k].referenceSpot;
                console.log(bestMatch.bestSpot);

            }
        }

        //console.log(bestMatch.bestSpot);

        let bestMatchPerson = {};

        bestMatchPerson = friendData[bestMatch.bestSpot];

        console.log(bestMatchPerson);

        res.json(bestMatchPerson);
    });
}

