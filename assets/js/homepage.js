var getUserRepos = function() {
    // format the github url
    var apiURL = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

console.log("outside");

getUserRepos();