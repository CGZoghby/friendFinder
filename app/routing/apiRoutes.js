//shoudl include two routes
//a GET route with "/api/friends" which will display a JSON of all *possible* friends
//a POST route with "/api/friends" which will handle incoming survey results. Also be used to handle compatability logic.
//compatability logic: convert (or store) each user's results as a simple array of numbers  (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`)
// compare the scores from two users by taking the difference (absolute value) between their scores on each question. 
// then sum up the differences for a "total difference" variable.
// the most compatible user is the one with least total difference from you. 
// display most compatible user as a modal pop up, with the name and picture in the modal of your closest match.