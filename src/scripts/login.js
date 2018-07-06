//The login object handles all functions associated with the login screen
let current = require("./currentUser")
let displayHome = require("./displayHome")

let login = {
    displayLogin: function(){
        $("article").append(
            $("<div>").attr("id", "loginDiv").append(
                $("<p>").text("Please login to continue"),
                $("<input>").text("Name").attr("id", "nameInput"),
                $("<input>").text("Password").attr("id", "passwordInput"),
                $("<button>").text("Submit").on("click", login.attemptLogin)
            )
        )
    },
    attemptLogin: function(){
        let name = $("#nameInput").val();
        let password = $("#passwordInput").val();
        $.ajax({
            url: "http://localhost:3000/users",
            method: "GET"
        })
        .then(users =>{
            let valid = false;
            for(let i = 0; i < users.length; i++){
                if(name === users[i].name){
                    if(password === users[i].password){
                        current.user = users[i].id;
                        displayHome();
                        valid = true;
                    }
                } else if (i === users.length-1 && valid === false){
                    alert("Please enter a username/password combination")
                }
            }
        })
    }
}

module.exports = login;