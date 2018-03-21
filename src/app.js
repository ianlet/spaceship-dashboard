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
    axios.get('http://127.0.0.1:9000/progress')
        .then(function (response) {
            var teams = JSON.parse(response.request.response)
            for (var i = 0; i < teams.length; i++) {
                var teamRank = teams[i].rank;
                $(`#${teamRank}`).replaceWith(teamStats_tmpl(teams[i]));
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
            if (eventContainer.parentNode) eventContainer.parentNode.removeChild(eventContainer);
            blurDashboardPanels(0);
        }
    }
}

var hardCodedEvent = {"name":"Penguins Penguins Rocket", "event": "Just BUILDED their stuffs", "status": "this BUILD SUCKS :D"};

function showEvent() {
    blurDashboardPanels(4);
    $('.dashboard').append(eventContainer_tmpl(hardCodedEvent));
}

function blurDashboardPanels(value) {
    $('#left-panel').css("filter", "blur(" + value + "px)");
    $('#right-panel').css("filter", "blur(" + value + "px)");
}
