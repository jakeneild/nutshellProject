//takes in an array of friends objects and returns html elements

let current = require("./currentUser")
let sendFriendRequest = require("./sendFriendRequest")
let openMessageThread = require("./openMessageThread")

let friendsElements = function (array, friendships, friendRequests) {
    let friendsDiv = $("<div>").attr("id", "friendsSubDiv").on("click", function(e){
        console.log("check")
        if(e.target.id.includes("friendDiv")){
            let friend = e.target.id.slice(9)
            openMessageThread(friend);
        }
    })
    friendsDiv.append(
        $("<br>"),
        $("<p>").text("Friends:")
    )
    //iterates through friends of current user and friend requests of
    //current user and if there are no matches found, myBool = false
    for (let i = 0; i < array.length; i++) {
        let myBool = false;

        if(array[i].id === current.user){
            bool = true;
        }

        if (friendships !== undefined && friendRequests !== undefined) {
            for (let j = 0; j < friendships.length; j++) {
                if (friendships[j].f1 === array[i].id && friendships[j].f2 === current.user) {
                    myBool = true;
                }
                if (friendships[j].f2 === array[i].id && friendships[j].f1 === current.user) {
                    myBool = true;
                }
            }
            for (let j = 0; j < friendRequests.length; j++) {
                if (friendRequests[j].to === array[i].id && friendRequests[j].from === current.user) {
                    myBool = true;
                }
                if (friendRequests[j].from === array[i].id && friendRequests[j].to === current.user) {
                    myBool = true;
                }
            }
        } else {
            myBool = true;
        }
        console.log("search keeps running")
        if (myBool === false) {
            console.log("case1")
            if (array[i].name !== undefined) {
                friendsDiv.append(
                    $("<div>").addClass("friendDiv").attr("id", `friendDiv${array[i].id}`).append(
                        $("<img>").attr("src", array[i].picture),
                        $("<p>").text(array[i].name),
                        $("<button>").attr("id", `${array[i].id}request`).attr("type", "button").text("Add").on("click", function () {
                            sendFriendRequest(array[i].id, current.user)
                            $(`#${array[i].id}request`).css("visibility", "hidden")
                        })
                    )
                )
            }
        } else {
            console.log("case2")
            if (array[i].name !== undefined) {
                friendsDiv.append(
                    $("<div>").attr("id", `friendDiv${array[i].id}`).addClass("friendDiv").append(
                        $("<img>").attr("src", array[i].picture),
                        $("<p>").text(array[i].name)
                    )
                )
            }
        }
    }
    console.log(friendsDiv)
    return friendsDiv
}


module.exports = friendsElements