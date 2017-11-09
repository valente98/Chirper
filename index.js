//************************ dropdown login ****************************/
function login() {
    var html = '<p>Have an account?</p>';
    html += '<p> Username: <br><input id="login-info"/></p>';
    return html;
}
function showlogin() {
    var btn =
        '<button id="login">Have an account? Log in<i class="fa fa-caret-down"></i></button>';
    $('#login-option').html(btn);
    var html = $('#login').on('click', function() {
        return login();
    });
    $('#dropdown').html(html);
}

//************************ signup ************************************/
function getUserInformation() {
    $('#submit').on('click', function() {
        var name = $('#name-input').val();
        var username = $('#username-input').val();
        var email = $('#email-input').val();
        var password = $('#password-input').val();
        signup({
            name: name,
            username: username,
            email: email,
            password: password
        });
    });
}

function signup(data) {
    $.post(
        'https://bcca-chirper.herokuapp.com/api/signup/',
        JSON.stringify(data)
    )
        .then(function handleFeedResponse(response) {
            console.log(response);
            PAGE_DATA = response;
        })
        .catch(function hadndleFeedReason(reason) {
            console.log('Failure:', reason);
            $('#username-error').html(
                '<li id="error" >A user with that username already exists.</li>'
            );
        });
}

//********************************** Main ***************************/
function main() {
    getUserInformation();
    showlogin();
}

$(main);
