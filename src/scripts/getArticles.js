let getUserArticles = function () {
    return $.ajax({
        url: "http://localhost:3000/userArticles",
        method: "GET",
    });
}

let getMyArticles = function () {
    return $.ajax({
        url: "http://localhost:3000/articles",
        method: "GET",
    });
}

let getArticles = function (arr) {
    let articleArr = [];
    return Promise.all([getUserArticles(), getMyArticles()]).then(([userArticles, articles]) => {
        for(let i = 0; i < arr.length; i++){
            let myId = arr[i].id
            if(myId === undefined){
                myId = arr[i]
            }
            for(let j = 0; j < userArticles.length; j++){
                if(userArticles[j].user === myId){
                    for(let k = 0; k < articles.length; k++){
                        if(userArticles[j].article === articles[k].id){
                            articleArr.push(articles[k])
                        }
                    }
                }
            }
        }
        return Promise.resolve(articleArr);
    }
    )
}



module.exports = getArticles