//takes in an array of friends objects and returns html elements

let friendsElements = function(array){
    let frag = document.createDocumentFragment();

    for(let i = 0; i < array.length; i++){
        frag.append(
            $("<div>").attr("id", "friendDIv").append(
                $("<img>").attr("src", array[i].picture),
                $("<p>").text(array[i].name)
            )
        )
    }

    return frag;
}


module.exports = friendsElements