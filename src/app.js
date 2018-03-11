import './assets/styles/styles.scss';

var dataSet = {
    rank: 1,
    name: "Team",
    score: 0,
    penalty: 0,
    user_stories: [
        { "number": 1, "status": "uncompleted" },
        { "number": 2, "status": "uncompleted" },
        { "number": 3, "status": "uncompleted" },
        { "number": 4, "status": "uncompleted" },
        { "number": 5, "status": "uncompleted" },
        { "number": 6, "status": "uncompleted" },
        { "number": 7, "status": "uncompleted" },
        { "number": 8, "status": "uncompleted" },
        { "number": 9, "status": "uncompleted" },
        { "number": 10, "status": "uncompleted" },
    ],
    build: "failed",
    test: "failed"
};

_.templateSettings.variable = "team";
var template = _.template(
    $("script.tmpl-TeamStats").html()
);

for (var i = 1; i < 30; i++) {
    if (i < 16) {
        $("#left-panel").append(template(dataSet));
    } else {
        $("#right-panel").append(template(dataSet));
    }
    document.getElementById("rank").setAttribute("id", i);
}

setInterval(function(){
    axios.get('http://127.0.0.1:8000/mounts/')
        .then(function (response) {
            for (var i = 0; i < 2; i++) {
                var teamRank = JSON.parse(response.request.response).results[i].rank;
                $('#'+teamRank).replaceWith(template(JSON.parse(response.request.response).results[i]));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}, 1000);


