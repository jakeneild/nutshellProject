//function takes a userId as an argument and returns an array of all their friends's objects

/*let getFriends = function (userId) {
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


module.exports = getFriends;*/

//function takes a userId as an argument and returns an array of all their friends's objects

// Returns a Promise that will return friendships
getFriendships = function () {
    return $.ajax({
      url: "http://localhost:3000/friendships",
      method: "GET",
    });
  };
  // Returns a Promise that will return users
  getUsers = function () {
    return $.ajax({
      url: "http://localhost:3000/users",
      method: "GET",
    });
  };
  // Returns a Promise to allow for chaining
  let getFriends = function(userId) {
    console.log(userId)
    if(isNaN(userId)){
        userId = userId.id
    }
    // not 100% sure how this is supposed to work from the call perspective
    // I'm using Promise.all to get the friendships and users at the same time
    // since the processing uses both lists
    return Promise.all([getFriendships(), getUsers()]).then(([friendships, users]) => {
      console.log(friendships, users);
      let friends = [];
      for (let i = 0; i < friendships.length; i++) {
        //iterating through all friendships
        if (friendships[i].f1 === userId || friendships[i].f2 === userId) {
          //finding matches
          let friendId = friendships[i].f1;
          if (friendships[i].f1 === userId) {
            friendId = friendships[i].f2;
          }
          for (let j = 0; j < users.length; j++) {
            if (users[j].id === friendId) {
              friends.push(users[j]);
            }
          }
        }
      }
      // finished with computations, resolve the Promise otherwise data
      // won't come back correctly or at all
      console.log(friends)
      return Promise.resolve(friends);
    });
  };
  module.exports = getFriends;