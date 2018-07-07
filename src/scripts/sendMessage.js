let sendMessage = function (to, from, content) {

    let getMessages = function () {
        return $.ajax({
            url: "http://localhost:3000/messages",
            method: "GET",
        })
    }

    let postMessage = function (myData) {
        $.ajax({
            url: "http://localhost:3000/messages",
            method: "POST",
            data: myData
        })
    }

    getMessages().then(messages => {
        let myId = -1
        for(let i = 0; i < messages.length; i++){
            if(messages[i].id > myId){
                myId = messages[i].id
            }
        }
        myId++

        let myData = {
            id: myId,
            to: to,
            from: from,
            content: content
        }

        postMessage(myData);

    })
}

module.exports = sendMessage