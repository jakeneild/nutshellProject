//returns a html element

let current = require("./currentUser")

let addArticleButton = function(){
    return $("<button>").attr("id", "addArticleButton").text("Add article").on("click", function(){
        console.log("button clicked")
    })

}

module.exports = addArticleButton