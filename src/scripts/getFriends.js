//function takes a userId as an argument and returns an array of all their friends's objects

let getFriends = function (userId) {
    let friends = [];
    $.ajax({
        url: "http://localhost:3000/friendships",
        method: "GET"
    })
        .then(friendships => {
            console.log(friendships)
            for (let i = 0; i < friendships.length; i++) { //iterating through all friendships
                if (friendships[i].f1 === userId || friendships[i].f2 === userId) { //finding matches
                    let friendId = friendships[i].f1;
                    if (friendships[i].f1 === userId) {
                        friendId = friendships[i].f2
                    }
                    $.ajax({
                        url: "http://localhost:3000/users",
                        method: "GET"
                    })
                        .then(users => {
                            for (let j = 0; j < users.length; j++) {
                                if (users[j].id === friendId) {
                                    friends.push(users[j])
                                }
                            }
                        }
                    )
                }
            }
        }
    )
    return friends;
}


module.exports = getFriends;