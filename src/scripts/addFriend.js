let current = require("./currentUser")

let addFriend = function(newFriend){

    let getFriendships = function(){
        return $.ajax({
            url: "http://localhost:3000/friendships",
            method: "GET",
        })
    }

    let postFriendShip = function(myData){
        return $.ajax({
            url: "http://localhost:3000/friendships",
            method: "POST",
            data: myData
        })
    }


    getFriendships().then(friendships =>{
        let myId = -1
        for(let i = 0; i < friendships.length; i++){
            if(friendships[i].id > myId){
                myId = friendships[i].id
            }
        }
        myId++;

        let obj = {
            id: myId,
            f1: current.user,
            f2: newFriend
        }

        postFriendShip(obj).then(()=>{
            //remove friend request
        })



    })
}

module.exports = addFriend