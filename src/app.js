import './assets/styles/styles.scss'

require('html-loader!./templates/index.html');

_.templateSettings.variable = "team";
var template = _.template(
    $("script.tmpl-TeamStats").html()
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
                $(`#${teamRank}`).replaceWith(template(teams[i]));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}, 5000);


