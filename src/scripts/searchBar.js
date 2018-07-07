//returns a search bar element

let friendsElements = require("./friendsElements")

let searchBar = function () {
    let resultsDiv = $("<div>").attr("id", "resultsDiv")
    let searchBarText = $("<p>").text("Search users:");
    let bar = $("<input>").attr("id", "searchBar").attr("type", "text").on("keyup", function () {
        $("#resultsDiv").html(" "); //clears the search results

        let query = $("#searchBar").val();
        if (query.length > 0) {
            let getFriendships = function () {
                return $.ajax({
                    url: "http://localhost:3000/friendships",
                    method: "GET",
                });
            };

            let getFriendRequests = function () {
                return $.ajax({
                    url: "http://localhost:3000/friendRequests",
                    method: "GET",
                });
            };

            let getUsers = function () {
                return $.ajax({
                    url: "http://localhost:3000/users",
                    method: "GET",
                });
            }

            Promise.all([getFriendships(), getFriendRequests(), getUsers()]).then(([friendships, friendRequests, users]) => {
                friendsArr = []
                for (let i = 0; i < users.length; i++) {
                    if (users[i].name.includes(query)) {
                        friendsArr.push(users[i])
                    }
                }
                $("#resultsDiv").append(friendsElements(friendsArr, friendships, friendRequests))
                while (document.querySelector("#resultsDiv").childElementCount > 1) {
                    document.querySelector("#resultsDiv").removeChild(document.querySelector("#resultsDiv").firstChild.nextSibling)
                }

            })
        }
    })
    return $("<div>").attr("id", "searchDiv").append(searchBarText, bar, resultsDiv)
}

module.exports = searchBar;