//returns an html element

let current = require("./currentUser")

let addEventButton = function(){
    return $("<button>").attr("id", "addEventButton").text("Add event").on("click", function(){
        console.log("button clicked")
    })

}

module.exports = addEventButton