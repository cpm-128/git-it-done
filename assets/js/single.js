var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1]; // this will provide an array with 2 elements
    getRepoIssues(repoName); //send the repoName to the function!
    repoNameEl.textContent = repoName;
};

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
        console.log(">>> apiURL >>>" , apiURL);
    fetch(apiURL)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    // pass response data to DOM displayIssues()
                    displayIssues(data);
                    // check if api has paginated issues (for github, more than 30 issues)
                    if (response.headers.get("Link")) {
                        displayWarning(repo);
                    }
                });
            } else {
                alert("There was a problem with the request.");
            }
        });
};

var displayIssues = function(issues) {

    // if not issues, provide message as such
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues or pull requests.";
        return;
    }

    for (var i = 0; i < issues.length; i++) {

        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
            issueEl.classList = "list-item flex-row justify-space-between align-center";
            issueEl.setAttribute("href" , issues[i].html_url);
            issueEl.setAttribute("target" , "_blank");

        // create span to hold issue title and put on page
        var titleEl = document.createElement("span");
            titleEl.textContent = issues[i].title;
            //append to container
            issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);

        // append container to the DOM
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    limitWarningEl.textContent = "There are more than 30 issues. To see all, ";
    var linkEl = document.createElement("a");
        linkEl.textContent = "visit GitHub.";
        linkEl.setAttribute("href" , "https://github.com/" + repo + "/issues");
        linkEl.setAttribute("target" , "_blank")
    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();
getRepoIssues();