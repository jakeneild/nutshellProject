let current = require("./currentUser")
let getFriendRequests = require("./getFriendRequests")

let deleteFriendRequest = function(userId){
    getFriendRequests().then(friendRequests =>{
        //find and delete the request

    })

}

module.exports = deleteFriendRequest