import './assets/styles/styles.scss';

require('html-loader!./templates/team-stats.html');
require('html-loader!./templates/index.html');
require('file-loader!./assets/images/pinguin-dead.png');
require('file-loader!./assets/images/pinguin-angel-2.png');


_.templateSettings.variable = "team";
var teamStats_tmpl = _.template(
    $("script.tmpl-TeamStats").html()
);

var eventContainer_tmpl = _.template(
    $("script.tmpl-EventContainer").html()
);

for (var i = 1; i < 28; i++) {
    if (i < 16) {
        $('#left-panel').append(`<div id="${i}"></div>`);
    } else {
        $('#right-panel').append(`<div id="${i}"></div>`);
    }
}

setInterval(function(){
    axios.get('http://127.0.0.1:8000/mounts/')
        .then(function (response) {
            for (var i = 0; i < 14; i++) {
                var teamRank = JSON.parse(response.request.response)[i].rank;
                $(`#${teamRank}`).replaceWith(teamStats_tmpl(JSON.parse(response.request.response)[i]));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}, 5000);


window.onkeypress = function(event) {
    if (event.keyCode == 32) {
        var eventContainer = document.getElementById("event-container");
        if (eventContainer == null) {
            showEvent();
        } else {
            // destroy event container
            if (eventContainer.parentNode) eventContainer.parentNode.removeChild(eventContainer);
        }
    }
}

var hardCodedEvent = {"name":"Penguins Penguins Rocket", "event": "Just BUILDED their stuffs", "status": "this BUILD SUCKS :D"};

function showEvent() {
    $('.dashboard').append(eventContainer_tmpl(hardCodedEvent));
}
