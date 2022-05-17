var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

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
    fetch(apiURL)
    .then(function(response) {
        // request was successful, no issues with server
        if(response.ok) {
            response.json().then(function(data) {
                // the arguments below is the key from the response object. we are sending to displayRepos. when in displayRepos, we are renaming
                displayRepos(data, user);
            });
        } else {
            // handle 404 errors, such as if a user does not exist
            window.alert("Error: GitHub User Not Found.");
        }
    })
    // resonse was unsuccessful, issue with server
    // this catch must immediately follow the .then() method which does NOT end with a ; aka it get chained on
    // .then and .catch are kind of like if{} else{} for server requests
    .catch(function(error) {
        alert("Unable to connect to GitHub.");
    });
    console.log(">>> github url >>>" , apiURL);
};

var displayRepos = function(repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // check if a valid user has any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "User exists but no repositories found.";
        return;
    }

    // loop over repos
    for (var i = 0; i < repos.length; i++) {

        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        
            // create a container for each repo
            var repoEl = document.createElement("div");
            repoEl.classList = "list-item flex-row justify-space-between align-center";

            // create a span element to hold repository name
            var titleEl = document.createElement("span");
            titleEl.textContent = repoName;

            // append to container
            repoEl.appendChild(titleEl);
            // this completes creating the title of the repo

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

            // check if current repo has issues or not and create HTML for inside the Element
            if (repos[i].open_issues_count > 0) {
                statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
            } else {
                statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
            }

            // append to container
            repoEl.appendChild(statusEl);

        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    };
};

userFormEl.addEventListener("submit", formSubmitHandler);