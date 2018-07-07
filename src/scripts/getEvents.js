//takes in an array of user id's and returns an array of event objects

let getUserEvents = function () {
    return $.ajax({
        url: "http://localhost:3000/userEvents",
        method: "GET",
    });
}

let getMyEvents = function () {
    return $.ajax({
        url: "http://localhost:3000/events",
        method: "GET",
    });
}

let getEvents = function (arr) {
    if (arr !== undefined) {
        console.log(arr)
        let myArr = []
        return Promise.all([getUserEvents(), getMyEvents()]).then(([userEvents, events]) => {
            for (let i = 0; i < userEvents.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    console.log("UserEvents[i]", userEvents[i]) //never reaching this
                    let myId = arr[j].id;
                    if (myId === undefined) { //handles multiple types of input.  Either just an ID or
                        myId = arr[j]       //an entire object
                    }
                    if (userEvents[i].user === myId) {

                        for (let k = 0; k < events.length; k++) {
                            if (events[k].id === userEvents[i].event) {
                                console.log("pushing", events[k])
                                myArr.push(events[k])
                            }
                        }
                    }
                }
            }
            return Promise.resolve(myArr);
        })
    }
}

module.exports = getEvents