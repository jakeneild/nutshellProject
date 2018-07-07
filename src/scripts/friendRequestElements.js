//takes in an array of friend objects and returns a div of HTML elements

let addFriend = require("./addFriend")
let deleteFriendRequest = require("./deleteFriendRequest")

let friendRequestElements = function(arr){
    console.log("friendRequestElements runs")
    console.log(arr)
    let myDiv = $("<div>").attr("id", "friendRequestsDiv")
    myDiv.append(
        $("<br>"),
        $("<p>").text("Friend requests:")
    )

    for(let i = 0; i < arr.length; i++){
        myDiv.append(
            $("<div>").attr("id", `friendRequest${arr[i].id}`).css("display", "flex").append(
                $("<p>").text(arr[i].name),
                $("<button>").attr("type", "button").attr("id", `addButton${arr[i].id}`).text("Add").on("click", function(){
                    addFriend(arr[i].id) //not finished
                    $(`#friendRequest${arr[i].id}`).remove();
                }),
                $("<button>").attr("type", "button").attr("id", `ignoreButton${arr[i].id}`).text("Ignore").on("click", function(){
                    deleteFriendRequest(arr[i].id) //not finished
                    $(`#friendRequest${arr[i].id}`).remove();
                })
            )
        )
    }

    return myDiv
}

module.exports = friendRequestElements