//************************ Password errors ************************************/
function onlyNumberLettersAndPunctuation(password) {
    var letterNumberPunctuation = /^[0-9a-zA-Z.,:;!?]*$/;
    if (password.match(letterNumberPunctuation)) {
        return true;
    }
    return false;
}

function checksPunctuationAndNumber(password) {
    return (
        /\d/.test(password) &&
        /[.,:;!?]/.test(password) &&
        /[a-zA-Z]/.test(password)
    );
}

function passwordErrorHtml(password) {
    var error = [];
    if (password.length < 12 || password.length > 16) {
        error.push(
            '<li id="error2">password must be between 12 to 16  characters</li>'
        );
    }
    if (onlyNumberLettersAndPunctuation(password) === false) {
        error.push(
            '<li id="error2">Password can only contain letter, number, and punctuation</li>'
        );
    }
    if (checksPunctuationAndNumber(password) === false) {
        error.push(
            '<li id="error2">Password must contain atleast 1 punctuation and number</li>'
        );
    }
    return error.join('');
}
function showPasswordErrors(password) {
    const h = passwordErrorHtml(password);
    $('#password-errors').html(h);
}
function addPasswordValidation() {
    const input = $('#password-input');
    input.on('input', function(event) {
        showPasswordErrors(event.currentTarget.value);
    });
}
//************************ username errors **************************/
function onlyNumberAndLetters(username) {
    var letterNumber = /^[0-9a-zA-Z]*$/;
    if (username.match(letterNumber)) {
        return true;
    }
    return false;
}
function showUsernameErrors(username) {
    const h = usernameErrorHtml(username);
    $('#username-error').html(h);
}
function addUsernameValidation() {
    const input = $('#username-input');
    input.on('input', function(event) {
        showUsernameErrors(event.currentTarget.value);
    });
}
function usernameErrorHtml(username) {
    var error = [];
    if (username.length < 8 || username.length > 16) {
        error.push(
            '<li id="error2">Username must be between 8 to 16  characters</li>'
        );
    }

    if (onlyNumberAndLetters(username) === false) {
        error.push(
            '<li id="error2">Username can only contain number and letters</li>'
        );
    }
    return error.join(' ');
}
//************************ dropdown login ****************************/
$('#login').on('click', function() {
    $('.dropdown-content').toggle();
});

//************************ signup ************************************/
function getUserInformation() {
    $('.signup-button').on('click', function() {
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
            console.log(PAGE_DATA);
        })
        .catch(function handleFeedReason(reason) {
            console.log('Failure:', reason);
            $('#username-error').html(
                '<li id="error" >A user with that username already exists.</li>'
            );
        });
}

//********************************** Main ***************************/
function main() {
    addPasswordValidation();
    addUsernameValidation();
    getUserInformation();
}

$(main);
