import './assets/styles/styles.scss';

require('html-loader!./templates/index.html');


var progressPositions = new Map();
var initialPosition = 4.5;
var positionInterval = 4.5;
for (var i = 1; i <= 10; i++) {
    progressPositions.set(i, initialPosition);
    initialPosition+= positionInterval;
}


_.templateSettings.variable = "team";
var templateRace = _.template(
    $("script.tmpl-teams-race").html()
);


_.templateSettings.variable = "team";
var template = _.template(
    $("script.tmpl-TeamStats").html()
);

for (var i = 1; i < 28; i++) {
    if (i < 14) {
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
                $(`#${teamRank}`).replaceWith(template(JSON.parse(response.request.response)[i]));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}, 2000);

function alternateDisplay() {
    var race = document.getElementById("penguins-race");
    if (race.style.display === "none") {
        race.style.display = "block";
    } else {
        race.style.display = "none";
    }
}
document.getElementById("penguins-race").style.display = "none";

for (var i = 1; i < 5; i++) {
    $('#race-panel').append(`<div class="race__team" id="${i}-race"></div>`);
}

axios.get('http://127.0.0.1:8000/mounts/')
    .then(function (response) {
        for (var i = 1; i < 5; i++) {
            $(`#${i}`+ "-race").replaceWith(templateRace(JSON.parse(response.request.response)[i]));
            document.getElementById("team-number").id = i + "-race";
        }
    })
    .catch(function (error) {
        console.log(error);
    });

setInterval(function(){
    alternateDisplay();
    axios.get('http://127.0.0.1:8000/mounts/')
        .then(function (response) {
            for (var i = 1; i < 5; i++) {
                var nbSucceededStories = JSON.parse(response.request.response)[i].sucessStories;
                console.log(i+"-race");
                document.getElementById(i+"-race").style.marginBottom = progressPositions.get(nbSucceededStories).toString() + "%";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}, 5000);


