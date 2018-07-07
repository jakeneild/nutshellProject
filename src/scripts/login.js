//The login object handles all functions associated with the login screen
let current = require("./currentUser")
let displayHome = require("./displayHome")

let login = {
    displayLogin: function () {
        $("article").append(
            $("<div>").attr("id", "loginPageDiv").append(
                $("<div>").attr("id", "loginDiv").append(
                    $("<p>").text("Login with your username and password"),
                    $("<input>").attr("placeholder", "Name").attr("id", "nameInput"),
                    $("<input>").attr("placeholder", "Password").attr("id", "passwordInput"),
                    $("<button>").text("Submit").on("click", login.attemptLogin)
                ),
                $("<div>").attr("id", "newUserDiv").append(
                    $("<p>").text("Create new user"),
                    $("<input>").attr("placeholder", "Name").attr("id", "newNameInput"),
                    $("<input>").attr("placeholder", "Password").attr("id", "newPasswordInput"),
                    $("<button>").text("Submit").on("click", login.createNewUser)
                )
            )

        )
    },
    createNewUser: function () {
        let newUser = $("#newNameInput").val();
        let newPassword = $("#newPasswordInput").val();
        if (newUser.length < 1 || newPassword.length < 1) {
            alert("Please fill out both the username and password")
        } else {
            let getUsers = function () {
                return $.ajax({
                    url: "http://localhost:3000/users",
                    method: "GET"
                })
            }

            getUsers().then(users => {
                myId = 0;
                for (let i = 0; i < users.length; i++) {
                    if (users[i].id > myId) {
                        myId = users[i].id
                    }
                }
                myId++;

                let myData = {
                    name: newUser,
                    password: newPassword,
                    id: myId,
                    picture: ""
                }

                $.ajax({
                    url: "http://localhost:3000/users",
                    method: "POST",
                    data: myData
                })
                .then(() => {
                    current.user = myId;
                    displayHome();
                })
            })
        }
    },
    attemptLogin: function () {
        let name = $("#nameInput").val();
        let password = $("#passwordInput").val();
        $.ajax({
            url: "http://localhost:3000/users",
            method: "GET"
        })
            .then(users => {
                let valid = false;
                for (let i = 0; i < users.length; i++) {
                    if (name === users[i].name) {
                        if (password === users[i].password) {
                            current.user = users[i].id;
                            displayHome();
                            valid = true;
                        }
                    } else if (i === users.length - 1 && valid === false) {
                        alert("Please enter a username/password combination")
                    }
                }
            })
    }
}

module.exports = login;