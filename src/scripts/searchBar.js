//returns a search bar element

let friendsElements = require("./friendsElements")

let searchBar = function () {
    let resultsDiv = $("<div>").attr("id", "resultsDiv")
    let searchBarText = $("<p>").text("Search users:");
    let bar = $("<input>").attr("id", "searchBar").attr("type", "text").on("keyup", function () {
        $("#resultsDiv").html(" "); //clears the search results

        let query = $("#searchBar").val();

        if (query.length > 0) {
            $.ajax({
                url: "http://localhost:3000/users",
                method: "GET"
            })
                .then(users => {
                    friendsArr = []
                    for (let i = 0; i < users.length; i++) {
                        if (users[i].name.includes(query)) {
                            friendsArr.push(users[i])
                        }
                    }
                    $("#resultsDiv").append(friendsElements(friendsArr))
                    console.log("appending search result", friendsElements(friendsArr))
                })
        }
    })

    return $("<div>").attr("id", "searchDiv").append(searchBarText, bar, resultsDiv)
}

module.exports = searchBar;