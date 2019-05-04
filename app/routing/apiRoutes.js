/* A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. */

const friendData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        friendData.push(req.body);
        res.json(friendData);

        let currentUserScores = [];

        for (let i = 0; i < req.body.scores.length; i++){
            currentUserScores.push(parseInt(req.body.scores[i]));
        }
        
        let totalDifference = 0;

        let allTotalDiffs = [];

        let refSpot = 0;
        
        for (let j = 0; j < friendData.length - 1; j++){
           
            totalDifference = 0;

            for(let i = 0; i < 10; i++){
                totalDifference += Math.abs(friendData[j].scores[i] - currentUserScores[i]);
            }
        
            addToTotalDiffs();
            
        }
        
        function addToTotalDiffs(){
            allTotalDiffs.push({totalDifference : totalDifference, referenceSpot: refSpot});
            refSpot++;
        }
    
        console.log(allTotalDiffs);

    });
}