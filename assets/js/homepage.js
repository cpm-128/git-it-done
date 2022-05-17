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
            // the arguments below is the key from the response object. we are sending to displayRepos. when in displayRepos, we are renaming
            displayRepos(data, user);
        });
    });
    console.log(">>> github url >>>" , apiURL);
};

var displayRepos = function(repos, searchTerm) {
    console.log(">>> repos >>>" , repos);
    console.log(">>> searchTerm >>>" , searchTerm);
};

userFormEl.addEventListener("submit", formSubmitHandler);