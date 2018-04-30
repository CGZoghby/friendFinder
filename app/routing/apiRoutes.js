var friendsData = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    //should include two routes
    //a GET route with "/api/friends" which will display a JSON of all *possible* friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });
    //a POST route with "/api/friends" which will handle incoming survey results. Also be used to handle compatability logic.
    app.post("/api/friends", function (req, res) {
        //now need to compare the user test scores against all others. But first lets make sure these scores exist

        //console.log(JSON.stringify(req.body.scores)); this is the path for the just-submitted scores, to compare against database ones.
        console.log(friendsData)
        var scoreWantingMatch = req.body.scores // store the req.body data inside a placeholder variable that I actually do math on
        var scoresToMatch = []; //initialize an array of arrays. Then taking the scores from inside friendsData, and pushing those in here
        //going to setup a loop, with the idea of looping through each array inside scoresToMatch, and comparing the differences against each other
        var totalDifference = []; //This is an array of objects that is going to have the friend's score tied to their totalDiff. 
        //Now do the serious loop:
        for (var i = 0; i < friendsData.length; i++) { //first loop selects the score array to do math on from the friendsData
            var placeholder = 0; //this will store and update the totalDiff until it is completely built for a user.
            for (var j = 0; j < friendsData[i].scores.length; j++) { //second loop then will go through cell by cell and find absolute difference.
                placeholder += Math.abs(parseInt(scoreWantingMatch[j]) - parseInt(friendsData[i].scores[j]));
            }
            var objToPush = {}
            objToPush[placeholder] = friendsData[i]
            totalDifference.push(objToPush); //store the placeholder variable as the key to that person's info.
        }
        console.log(totalDifference);
        friendsData.push(req.body); //finally, after calculating the scores for everyone there, push the just submitted scores to friendsData
        //now find the smallest totalDifference of all possible ones available
        var smallestDiff = 41; //if you are 100% opposite someone, your max difference is 40. So making it 41 so that the if-logic will always work below
        for (var i = 0; i < totalDifference.length; i++) {
            var tempSmallestDiff = parseInt(Object.keys(totalDifference[i])[0]);
            if (tempSmallestDiff < smallestDiff) {
                smallestDiff = tempSmallestDiff;
            }
        }
        //then find which user matches that set of scores
        //and return their data
        for (var i = 0; i < totalDifference.length; i++) {
            if (Object.keys(totalDifference[i]).indexOf(String(smallestDiff)) > -1) {
                //console.log(totalDifference[i][String(smallestDiff)])
                res.json(totalDifference[i][String(smallestDiff)])
            }
        }
    });
    //compatability logic: convert (or store) each user's results as a simple array of numbers  (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`)
    // compare the scores from two users by taking the difference (absolute value) between their scores on each question. 
    // then sum up the differences for a "total difference" variable.
    // the most compatible user is the one with least total difference from you. 
    // display most compatible user as a modal pop up, with the name and picture in the modal of your closest match.
};