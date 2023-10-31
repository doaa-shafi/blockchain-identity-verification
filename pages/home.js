function init() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
        if (response["status"] === "connected") {
            const accessToken = response["authResponse"]["accessToken"];
            window.token = accessToken;
            console.log("Token: " + accessToken);
            setUserInfo();
        }
    });
}


function statusChangeCallback(response) {
    console.log(response);
    if (response["status"] !== "connected") {
        window.location.href = "/";
    }
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function setUserInfo() {
    const query =  "https://graph.facebook.com/me?fields=picture,name,email&access_token=" + window.token
    
    const response = JSON.parse(httpGet(query));

    const pictureUrl = response["picture"]["data"]["url"];
    const name = response["name"];
    const email = response["email"];
    
    document.getElementById("pp").src = pictureUrl;
    document.getElementById("name").innerHTML = name;
    document.getElementById("email").innerHTML = email;
}