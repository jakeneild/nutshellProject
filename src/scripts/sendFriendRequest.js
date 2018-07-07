
let sendFriendRequest = function(target, sender){
    $.ajax({
        url: "http://localhost:3000/friendRequests",
        method: "GET"
    }).then(friendRequests =>{
        let myId = -1;
        for(let i = 0; i < friendRequests.length; i++){
            if(friendRequests[i].id > myId){
                myId = friendRequests[i].id
            }
        }
        myId++;
        $.ajax({
            url: "http://localhost:3000/friendRequests",
            method: "POST",
            data: {
                id: myId,
                to: target,
                from: sender
            }
        })

    })
}

module.exports = sendFriendRequest