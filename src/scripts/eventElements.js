//This module takes in an array of objects with friends info and returns html elements

let eventElements = function (array) {
    console.log(array)
    let eDiv = $("<div>").attr("id", "eventsDiv")
    for (let i = 0; i < array.length; i++) {
        eDiv.append($("<div>").attr("id", "eventDiv").append(
            $("<div>").attr("id", "eventInfoDiv").append(
                $("<h2>").text(array[i].name),
                $("<p>").html(`<p><span class="bold">When:</span> ${array[i].time}</p>`),
                $("<p>").text(`<span class="bold">Where:</span> ${array[i].location}`),
                $("<p>").text(`<span class="bold">Summary:</span> ${array[i].location}`)
            ),
            $("<img>").attr("src", array[i].photo)
        ))
    }
    return eDiv;
}

module.exports = eventElements