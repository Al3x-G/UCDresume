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
