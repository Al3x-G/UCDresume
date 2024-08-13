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
} /* notice the use of back ticks, this section inputs a loader when text has been inputted */
