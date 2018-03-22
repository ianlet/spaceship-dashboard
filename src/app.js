import './assets/styles/styles.scss';

require('html-loader!./templates/team-stats.html');
require('html-loader!./templates/index.html');
require('file-loader!./assets/images/pinguin-dead.png');
require('file-loader!./assets/images/pinguin-angel-2.png');

// vars init
var progressPositions = new Map();
var initialPosition = 4.5;
var positionInterval = 4.5;
for (var i = 1; i <= 10; i++) {
    progressPositions.set(i, initialPosition);
    initialPosition+= positionInterval;
}

// templates init
_.templateSettings.variable = "team";
var templateRace = _.template(
    $("script.tmpl-teams-race").html()
);
var teamStats_tmpl = _.template(
    $("script.tmpl-TeamStats").html()
);
var eventContainer_tmpl = _.template(
    $("script.tmpl-EventContainer").html()
);

// fill initial team-stats container
for (var i = 1; i < 28; i++) {
    if (i < 16) {
        $('#left-panel').append(`<div id="${i}"></div>`);
    } else {
        $('#right-panel').append(`<div id="${i}"></div>`);
    }
}

// update team-stats (inginite loop)
setInterval(function(){
    axios.get('http://127.0.0.1:9000/progress')
        .then(function (response) {
            var teams = JSON.parse(response.request.response);
            for (var i = 0; i < teams.length; i++) {
                var teamRank = teams[i].rank;
                $(`#${teamRank}`).replaceWith(teamStats_tmpl(teams[i]));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}, 2000);


// init pinguin-race
document.getElementById("penguins-race").style.display = "none";
for (var i = 0; i < 5; i++) {
    $('#race-panel').append(`<div class="race__team" id="${i}-race"></div>`);
}

// update pinguin-race
axios.get('http://127.0.0.1:9000/progress')
    .then(function (response) {
        for (var i = 0; i < 10; i++) {
            $(`#${i}`+ "-race").replaceWith(templateRace(JSON.parse(response.request.response)[i]));
            document.getElementById("team-number").id = i + "-race";
        }
    })
    .catch(function (error) {
        console.log(error);
    });

setInterval(function() {
    axios.get('http://127.0.0.1:9000/progress')
        .then(function (response) {
            for (var i = 0; i < 5; i++) {
                var nbSucceededStories = JSON.parse(response.request.response)[i].sucessStories;
                document.getElementById(i+"-race").style.marginBottom = progressPositions.get(nbSucceededStories).toString() + "%";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}, 5000);

// event handlers
window.onkeypress = function(event) {
    if (event.keyCode == 32) {
        var eventContainer = document.getElementById("event-container");
        if (eventContainer == null) {
            showEvent();
        } else {
            if (eventContainer.parentNode) eventContainer.parentNode.removeChild(eventContainer);
            blurDashboardPanels(0);
        }
    } else if (event.keyCode == 13) {
        alternateDisplay();
    }
}

// functions
function alternateDisplay() {
    var race = document.getElementById("penguins-race");
    if (race.style.display === "none") {
        race.style.display = "block";
    } else {
        race.style.display = "none";
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
