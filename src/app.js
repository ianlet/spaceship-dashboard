import './assets/styles/styles.scss'

require('html-loader!./templates/index.html');
require('file-loader!./assets/images/background-dark.png');

_.templateSettings.variable = "team";
var teamStats_tmpl = _.template(
    $("script.tmpl-TeamStats").html()
);

var nbTeams = 30;

for (var i = 1; i <= nbTeams; i++) {
    if (i < 16) {
        $('#left-panel').append(`<div id="${i}"></div>`);
    } else {
        $('#right-panel').append(`<div id="${i}"></div>`);
    }
}

setInterval(function(){
    axios.get('http://127.0.0.1:8000/mounts/')
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





