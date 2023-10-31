function init() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log(response);
    if (response["status"] === "connected") {
        window.location.href = "/home";
    }
}