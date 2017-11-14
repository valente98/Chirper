var PAGE_DATA = new Object();
//*********************** change num to month ************************/
const month = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};
//**************************** column1 *********************************/
function userInformation() {
    var html =
        '<h2><a id="name" href="https://www.twitter.com/' +
        PAGE_DATA.chirper.username +
        '">' +
        PAGE_DATA.chirper.name +
        '</a></h2>';
    html +=
        '<h4><a id="username" href="https://www.twitter.com/' +
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
function picture() {
    return '<i id="img-circle"class="fa fa-user-circle" aria-hidden="true"></i>';
}

function showUserInformation() {
    var h = userInformation();

    $('#column1').html(h);
}
function showPic() {
    var p = picture();
    $('#header1').html(p);
}

//**************************** column2 *********************************/
function chirpInformation(chirp) {
    var html =
        '<a id="user" href="https://twitter.com/' +
        PAGE_DATA.chirper.username +
        '">' +
        chirp.author.name +
        '</a><a id="info" href="https://twitter.com/' +
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
function signup() {
    var html = '<h5> New to Chirper?<h4>';
    html += '<p id="sign">Sign up now to get your own personalized timeline!';
    html +=
        '<br><br><br><a href="../../November/chirper-frontend/signup/index.html" class="signup-button">Sign up</a>';
    return html;
}
function showsignup() {
    var html = signup();
    $('#column3').html(html);
}
//****************************************** column 4 ***********************/
// function youMayAlsoLIKE(suggest) {
//     var html =
//         '<div id="usernames"><img class="img-circle2" src="' +
//         suggest.img_url +
//         '" alt="Raymond Hettinger"height="60" width="60"></div><br><p id="names"><a id="user" href="https://twitter.com/' +
//         suggest.username +
//         '">' +
//         suggest.name +
//         '</p><p>@' +
//         suggest.username +
//         '</a></p>';

//     return html;
// }
// function showyouMayAlsoLike() {
//     var friendData = PAGE_DATA.suggestedFriends.slice();
//     var data = new Array();
//     while (data.length < 5) {
//         var i = Math.floor(Math.random() * friendData.length);
//         data.push(friendData[i]);
//         friendData.splice(i, 1);
//     }
//     var html =
//         '<h5> You may also like </h5><button id="refreshFriends"  onclick="showyouMayAlsoLike()" type="button">&bull; Refresh</button>';
//     html += data
//         .map(function(suggest) {
//             return youMayAlsoLIKE(suggest);
//         })
//         .join('');
//     $('#column4').html(html);
// }
//***************************** searchbar *****************************/
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
                    'file:///home/basecamp/Projects/Dailey_exercises/October/chirper-feed/index.html?user=' +
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

//***************************** Columntweet ***************************/
function tweetButton() {
    var html =
        '<button id="tweetbutton" onclick="addTweetInput()">Chirp</button>';
    html +=
        '<button type="button" id="popup" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Chirps & replies</button>';
    html +=
        '<button type="button" id="popup" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Media</button>';
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
            month: d.getMonth(),
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
            showPic();
            showUserInformation();
            showChirpInformation();
            showsignup();
            search();
            // showyouMayAlsoLike();
            showAddTweetInput();
            // showpopus();
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
