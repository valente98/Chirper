$('#login').on('click', function() {
    $('.dropdown-content').toggle();
});
function login() {
    $('.login-button').on('click', function() {
        var info = $.post(
            'https://bcca-chirper.herokuapp.com/api/login/',
            JSON.stringify({
                username: $('#username-input').val(),
                password: $('#password-input').val()
            })
        )
            .then(function handleFeedResponse(response) {
                PAGE_DATA = response;
                var key = window.localStorage.setItem('key', PAGE_DATA.key);
                window.location =
                    'file:///home/basecamp/Projects/Dailey_exercises/November/chirper-frontend/user_homepage/index.html?user=' +
                    $('#username-input').val() +
                    '';
            })
            .catch(function handleFeedReason(reason) {
                console.log('Failure:', reason);
                $('#login-error').html(
                    '<li id="error" >Sorry incorrect username or password</li>'
                );
            });
    });
}

//********************************** Main ***************************/
function main() {}
login();
$(main);
