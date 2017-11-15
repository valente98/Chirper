var PAGE_DATA = new Object();
//*********************** change num to month ************************/
const month = {
    0: '',
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};
//**************************** column1 *********************************/
function userInformation() {
    var html =
        '<h2><a id="name" href="../user_homepage/index.html?user=' +
        PAGE_DATA.chirper.username +
        '">' +
        PAGE_DATA.chirper.name +
        '</a></h2>';
    html +=
        '<h4><a id="username" href="../user_homepage/index.html?user=' +
        PAGE_DATA.chirper.username +
        '">@' +
        PAGE_DATA.chirper.username +
        '</a></p>';
    html += '<p id="description">' + PAGE_DATA.chirper.description + '</p>';
    html +=
        '<p><i class="fa fa-map-pin" aria-hidden="true"></i> ' +
        PAGE_DATA.chirper.location +
        '</p>';
    html +=
        '<p><i class="fa fa-bookmark" aria-hidden="true"></i> <a href="https://' +
        PAGE_DATA.chirper.website +
        '">' +
        PAGE_DATA.chirper.website +
        '</a></p>';
    html +=
        '<p><i class="fa fa-calendar" aria-hidden="true"></i> Joined: ' +
        month[PAGE_DATA.chirper.joined.month] +
        '  ' +
        PAGE_DATA.chirper.joined.year +
        '</p>';
    return html;
}
function showUserInformation() {
    var h = userInformation();

    $('#column1').html(h);
}

//**************************** column2 *********************************/
function chirpInformation(chirp) {
    var html =
        '<a id="user" href="../user_homepage/index.html?user=' +
        PAGE_DATA.chirper.username +
        '">' +
        chirp.author.name +
        '</a><a id="info" href="../user_homepage/index.html?user=' +
        PAGE_DATA.chirper.username +
        '"> @' +
        chirp.author.username +
        ' ' +
        month[chirp.date.month] +
        ' ' +
        chirp.date.day +
        '</a></h3>';
    html +=
        '<p><i class="fa fa-arrow-right" aria-hidden="true"></i> ' +
        chirp.message +
        '</p>';
    return html;
}
function showChirpInformation() {
    var html = PAGE_DATA.chirps
        .map(function(chirp) {
            return chirpInformation(chirp);
        })
        .join('');
    $('#column2').html(html);
}
function search() {
    $('#searchbutton').on('click', function() {
        $.post(
            'https://bcca-chirper.herokuapp.com/api/' + $('#search').val() + '/'
        )
            .then(function handleFeedResponse(response) {
                console.log(response);
                PAGE_DATA = response;
                console.log(PAGE_DATA);
                window.location =
                    '../user_homepage/index.html?user=' +
                    $('#search').val() +
                    '';
            })
            .catch(function handleFeedReason(reason) {
                console.log('Failure:', reason);
                $('#search-error').html(
                    '<li id="error" >Incorrect username</li>'
                );
            });
    });
}
//***************************** Sign out ******************************/
$('#signout').on('click', function() {
    window.location = '../login/index.html';
});
//***************************** Columntweet ***************************/
function tweetButton() {
    var html =
        '<button id="tweetbutton" onclick="addTweetInput()">Chirp</button>';
    return html;
}

function addTweetInput() {
    var html =
        '<h7>Tweet: <button id="cancel" onclick="showAddTweetInput()">Cancel</button></h7> <textarea id="textarea" cols= 60 rows= 5/>';
    html +=
        '<button id="submit" onclick="addTweetInputInPAGEDATA()">Submit</button>';
    $('#columntweet').html(html);
}
function showAddTweetInput() {
    var html = tweetButton();
    $('#columntweet').html(html);
}
function addTweetInputInPAGEDATA() {
    var d = new Date();
    console.log(d.getDate());
    var message = {
        author: {
            name: PAGE_DATA.chirper.name,
            username: PAGE_DATA.chirper.username
        },
        date: {
            month: d.getMonth() + 1,
            day: d.getDate(),
            year: d.getFullYear()
        },
        message: $('#textarea').val()
    };
    $.post(
        'https://bcca-chirper.herokuapp.com/api/chirp/',
        JSON.stringify({
            key: window.localStorage.getItem('key'),
            message: message.message
        })
    ).then(function() {
        PAGE_DATA.chirps.splice(0, 0, message);
        showAddTweetInput();
        showChirpInformation();
    });
}
//***************************** Main **********************************/
function main(username) {
    $.get('https://bcca-chirper.herokuapp.com/api/' + username + '/')
        .then(function handleFeedResponse(response) {
            PAGE_DATA = response;
            console.log(PAGE_DATA);
            showUserInformation();
            showChirpInformation();
            search();
            showAddTweetInput();
        })
        .catch(function handleFeedReason(reason) {
            console.log('Failure:', reason);
        });
}
$(function() {
    var user = new URLSearchParams(document.location.search.substring(1)).get(
        'user'
    );
    if (user) {
        main(user);
    } else {
        main('valvarez3');
    }
});
