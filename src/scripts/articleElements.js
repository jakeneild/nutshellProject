//takes in an array of objects and retuns HTML Elements

let articleElements = function(array){
    let aDiv = $("<div>").attr("id", "articlesSubDiv")
    for(let i = 0; i < array.length; i++){ //iterates through array
        aDiv.append(
            $("<div>").attr("id", "articleDiv").append(
                $("<div>").attr("id", "articleInfoDiv").append(
                    $("<h2>").text(array[i].title),
                    $("<p>").text(array[i].summary),
                    $("<br>"),
                    $("<a>").text(array[i].url)
                ),
                $("<img>").attr("src", array[i].photo)
            )
        )
    }
    return aDiv;
}

module.exports = articleElements