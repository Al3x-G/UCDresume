/*this function below uses template literal backticks to display the info retreived from github API USER*/
function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function fetchGitHubInformation(event) {

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return; 
    } /*this first section looks for id gh-username and if empty, fills gh-user-data with h2 text*/

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
/* notice the use of back ticks (template literal), this section inputs a loader when text has been inputted */

/********************************************************************************************* */

/*below is a jquery promise, when: something has finished happening, then: do something else */
/*

when: we have got a response from github API

then: function to display it in the gh-user-data div
      unless we get an error!

*/
$.when(
    $.getJSON(`https://api.github.com/users/${username}`)
).then(
    function(response) {
        var userData = response;
        $("#gh-user-data").html(userInformationHTML(userData));
    },
    function(errorResponse) {
        if (errorResponse.status === 404) {
            $("#gh-user-data").html(
                `<h2>No info found for user ${username}</h2>`);
        } else {
            console.log(errorResponse);
            $("#gh-user-data").html(
                `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
        }
    });
}
