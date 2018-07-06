//Displays a user's home page

let current = require("./currentUser")
let getFriends = require("./getFriends")
let eventElements = require("./eventElements")
let articleElements = require("./articleElements")
let friendsElements = require("./friendsElements")
let searchBar = require("./searchBar")
let getEvents = require("./getEvents")

let displayHome = function(){

    const friends = getFriends(current.user);
    console.log("friends: ", friends) //this is coming out fine

    let eventArr = getEvents(friends) //this is not
    console.log(eventArr)
    //eventArr.push(getEvents([current.user]))  //so I think the .then chain is getting messed up here
    //just gonna comment the above line out for simplicity's sake until I can get the first instance working

    $("article").html("");
    $("article").append(
        $("<div>").attr("id", "eventsDiv").append(
            eventElements(eventArr)
        ),
        $("<div>").attr("id", "articlesDiv").append(
            articleElements([current.user]),
            articleElements(friends)
        ),
        $("<div>").attr("id", "friendsDiv").append(
            $("<div>").attr("id", "myFriendsDiv").append(
                friendsElements(friends)
            ),
            $("<div>").attr("id", "searchDiv").append(
                searchBar()
            )
        )

    )
}

module.exports = displayHome;