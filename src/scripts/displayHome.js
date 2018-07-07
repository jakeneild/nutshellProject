//Displays a user's home page

let current = require("./currentUser")
let getFriends = require("./getFriends")
let eventElements = require("./eventElements")
let articleElements = require("./articleElements")
let friendsElements = require("./friendsElements")
let searchBar = require("./searchBar")
let getEvents = require("./getEvents")
let getArticles = require("./getArticles")
let getFriendRequests = require("./getFriendRequests")
let friendRequestElements = require("./friendRequestElements")
let addEventButton = require("./addEventButton")
let addArticleButton = require("./addArticleButton")

let displayHome = function () {

    /*const friends = getFriends(current.user);
    console.log("friends: ", friends) //this is coming out fine

    let eventArr = getEvents(friends) //this is not
    console.log(eventArr)*/
    getFriendRequests(current.user).then(friendRequests => {
        console.log(friendRequests)
        getFriends(current.user).then(friends => {
            console.log("check3")
            friends.push(current.user)
            getEvents(current.user).then(eventArr => {
                console.log("check2")
                getArticles(current.user).then(articleArr => {
                    console.log("check")
                    $("article").html("");
                    $("article").append(
                        $("<div>").attr("id", "contentDiv").append(
                            $("<h3>").attr("id", "wallTitle").text("Your wall"),
                            $("<div>").attr("id", "eventsArticles").append(
                                $("<div>").attr("id", "eventsDiv").append(
                                    addEventButton(),
                                    eventElements(eventArr)
                                ),
                                $("<div>").attr("id", "articlesDiv").append(
                                    addArticleButton(),
                                    articleElements(articleArr)
                                )
                            )
                        ),
                        $("<div>").attr("id", "friendsDiv").append(
                            $("<div>").attr("id", "myFriendsDiv").append(
                                friendsElements(friends)
                            ),
                            $("<div>").attr("id", "friendRequestDiv").append(
                                friendRequestElements(friendRequests)  //not defined yet
                            ),
                            $("<div>").attr("id", "searchDiv").append(
                                searchBar()
                            )
                        )
                    )
                })
            }

            )
            for (let i = 0; i < friends.length; i++) {
                console.log(friends[i])
                if(friends[i] !== undefined){
                    getEvents(friends[i].id).then(events => {
                        getArticles(friends[i].id).then(articles => {
                            console.log("check")
                            $("#contentDiv").append(
                            $("<h3>").attr("id", "wallTitle").text(`${friends[i].name}'s wall:`),
                                $("<div>").attr("id", "eventsArticles").append(
                                    $("<div>").attr("id", "eventsDiv").append(
                                        eventElements(events)
                                    ),
                                    $("<div>").attr("id", "articlesDiv").append(
                                        articleElements(articles)
                                    )
                                )
                            )
                        })
                    })
                }
            }
        }
        )
    })

    //eventArr.push(getEvents([current.user]))  //so I think the .then chain is getting messed up here
    //just gonna comment the above line out for simplicity's sake until I can get the first instance working
}

module.exports = displayHome;