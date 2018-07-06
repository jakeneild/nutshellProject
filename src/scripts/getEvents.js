//takes in an array of user id's and returns an array of event objects

let getEvents = function (arr) {
    console.log(arr)
    let myArr = []
    $.ajax({
        url: "http://localhost:3000/userEvents",
        method: "GET"
    })
        .then(userEvents => {
            console.log(userEvents)
            for (let i = 0; i < userEvents.length; i++) {
                console.log(userEvents[i])
                console.log(arr) //length is 1 here
                console.log(arr.length) //length is 0 here

                for (let j = 0; j < arr.length; j++) { //length must be 0
                    runOnce = true;
                    console.log("UserEvents[i]", userEvents[i]) //never reaching this
                    let myId = arr[j].id;
                    if (myId === undefined) { //handles multiple types of input.  Either just an ID or
                        myId = arr[j]       //an entire object
                    }
                    console.log(myId)
                    if (userEvents[i].user === myId) {
                        console.log("check")
                        $.ajax({
                            url: "http://localhost:3000/events",
                            method: "GET"
                        })
                            .then(events => {
                                for (let k = 0; k < events.length; k++) {
                                    if (events[k].id === userEvents[i].event) {
                                        console.log("pushing", events[k])
                                        myArr.push(events[k])
                                    }
                                }
                            })
                    }
                }

            }
        }
        )
    console.log("events: ", myArr)
    return myArr
}

module.exports = getEvents