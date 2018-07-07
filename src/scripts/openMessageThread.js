let current = require("./currentUser")
let sendMessage = require("./sendMessage")

let openMessageThread = function (user) {
    console.log("opening message thread")

    let getUsers = function () {
        return $.ajax({
            url: "http://localhost:3000/users",
            method: "GET"
        })
    }

    let getMessages = function () {
        return $.ajax({
            url: "http://localhost:3000/messages",
            method: "GET"
        })
    }

    Promise.all([getUsers(), getMessages()]).then(([users, messages]) => {
        let userName = ""
        let currentUserName = "";
        for(let i = 0; i < users.length; i++){
            if(users[i].id === user){
                userName = users[i].name
            }
            if(users[i].id === current.user){
                currentUserName = users[i].name
            }
        }

        let messageArray = [];

        for(let i = 0; i< messages.length; i++){
            if(messages[i].to === user && messages[i].from === current.user){
                messageArray.push(messages[i])
            }
            if(messages[i].from === user && messages[i].to === current.user){
                messageArray.push(messages[i])
            }
        }

        console.log(document.getElementById("messageBox"))
        if (document.getElementById("messageBox") === null) {
            console.log("appending message box")
            $("#friendsDiv").append(
                $("<div>").attr("id", "messageBox").append(
                    $("<div>").attr("id", "messageHeader").text(userName).val(user),
                    $("<div>").attr("id", "messageBody"),
                    $("<input>").attr("type", "text").attr("id", "messageInput").on("keydown", function (e) {
                        let key = e.keyCode;
                        if (key === 13) {
                            sendMessage($("#messageHeader").val(), current.user, $("#messageInput").val()) //not defined yet
                            $("#messageBody").append(
                                $("<div>").attr("id", "message").text(
                                    `${currentUserName}: ${$("#messageInput").val()}`
                                ),
                                $("<br>")
                            )
                            $("#messageInput").val("")
                        }
                    })
                )
            )
        } else {
            $("#messageHeader").text(userName).val(user);
            $("#messageBody").html(" ")
            $("#messageInput").val("")
        }

        for(let i = 0; i < messageArray.length; i++){
            let from = ""

            if(messageArray[i].from === current.user){
                from = currentUserName
            } else {
                from = userName
            }

            $("#messageBody").append(
                $("<div>").attr("id", "message").text(
                    `${from}: ${messageArray[i].content}`
                ),
                $("<br>")
            )
        }

    })
}

module.exports = openMessageThread