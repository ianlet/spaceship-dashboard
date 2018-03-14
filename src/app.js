import './assets/styles/styles.scss';

require('html-loader!./templates/index.html');

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
            for (var i = 0; i < 2; i++) {
                var teamRank = JSON.parse(response.request.response)[i].rank;
                $(`#${teamRank}`).replaceWith(template(JSON.parse(response.request.response)[i]));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}, 5000);


