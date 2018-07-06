//returns a search bar element

let searchBar = function(){
    let searchBarText = $("<p>").text("Search users:");
    let bar = $("<input>").attr("id", "searchBar").attr("type", "text").on("keyUp", function(){
        $("#resultsDiv").html(" "); //clears the search results

        let query = $("#searchBar").val();

        $.ajax({
            url: "http://localhost:3000/users",
            method: "GET"
        })
        .then(users => {
            friendsArr = []
            for(let i = 0; i < users.length; i++){
                if(users[i].name.includes(query)){
                    friendsArr.push(users[i])
                }
            }
            resultsDiv.append(friendsElements(friendsArr))
        })
    })
    let resultsDiv = $("<div>").attr("id", "resultsDiv")

    return $("<div>").attr("id", "searchDiv").append(searchBarText, bar, resultsDiv)
}

module.exports = searchBar;