//takes in an array of friends objects and returns html elements

let current = require("./currentUser")
let sendFriendRequest = require("./sendFriendRequest")

let friendsElements = function (array) {
    let friendsDiv = $("<div>").attr("id", "friendsSubDiv")

    getFriendships = function () {
        return $.ajax({
            url: "http://localhost:3000/friendships",
            method: "GET",
        });
    };

    getFriendRequests = function () {
        return $.ajax({
            url: "http://localhost:3000/friendRequests",
            method: "GET",
        });
    };

    Promise.all([getFriendships(), getFriendRequests()]).then(([friendships, friendRequests]) => {

        //iterates through friends of current user and friend requests of
        //current user and if there are no matches found, myBool = false
        for(let i = 0; i < array.length; i++){
            let myBool = false;

            for(let j = 0; j < friendships.length; j++){
                if(friendships[j].f1 === array[i].id && friendships[j].f2 === current.user){
                    myBool = true;
                }
                if(friendships[j].f2 === array[i].id && friendships[j].f1 === current.user){
                    myBool = true;
                }
            }

            for(let j = 0; j < friendRequests.length; j++){
                if(friendRequests[j].to === array[i].id && friendRequests[j].from === current.user){
                    myBool = true;
                }
                if(friendRequests[j].from === array[i].id && friendRequests[j].to === current.user){
                    myBool = true;
                }
            }

            console.log("search keeps running")
            if (myBool === false) {
                console.log("case1")
                friendsDiv.append(
                    $("<div>").attr("id", "friendDiv").append(
                        $("<img>").attr("src", array[i].picture),
                        $("<p>").text(array[i].name),
                        $("<button>").attr("id", `${array[i].id}request`).attr("type", "button").text("Add").on("click", function () {
                            sendFriendRequest(current.user, array[i].id)
                            $(`#${array[i].id}request`).css("visibility", "hidden")
                        })
                    )
                )
            } else {
                console.log("case2")
                friendsDiv.append(
                    $("<div>").attr("id", "friendDiv").append(
                        $("<img>").attr("src", array[i].picture),
                        $("<p>").text(array[i].name)
                    )
                )
            }
        }
        console.log(friendsDiv)
        return friendsDiv;
    })
}


module.exports = friendsElements