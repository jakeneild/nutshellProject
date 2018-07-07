let current = require("./currentUser")

//returns an arry of objects

let getFriendRequests = function(){
    let myArray = []

    let getUsers = function(){
        return $.ajax({
            url: "http://localhost:3000/users",
            method: "GET",
          });
    }

    let getMyFriendRequests = function(){
        return $.ajax({
            url: "http://localhost:3000/friendRequests",
            method: "GET",
          });
    }

    return Promise.all([getUsers(), getMyFriendRequests()]).then(([users, friendRequests]) => {
        console.log(users, friendRequests)
        for(let i = 0; i < friendRequests.length; i++){
            console.log("check")
            console.log(friendRequests[i], current.user)
            if(friendRequests[i].to === current.user){
                console.log("Match found")
                for(let j = 0; j < users.length; j++){
                    if(users[j].id === friendRequests[i].from){
                        myArray.push(users[j])
                        console.log("pushing")
                    }
                }
            }
        }
        console.log("returning", myArray)
        return Promise.resolve(myArray);
    })




}


module.exports = getFriendRequests