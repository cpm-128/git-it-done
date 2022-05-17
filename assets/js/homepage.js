var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();
    if (username) {
        // this passes the username to the getUserRepos function and will run it
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username.");
    }
};

var getUserRepos = function(user) {
    // format the github url
    var apiURL = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            console.log(">>> DATA >>>" , data);
        });
    });
    console.log(">>> github url >>>" , apiURL);
};

userFormEl.addEventListener("submit", formSubmitHandler);