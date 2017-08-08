'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());



var valuesb = "we";

var city_value = "makati";



function getWeather(city){
    request.get("http://query.yahooapis.com/v1/public/yql?q=select+%2A+from+weather.forecast+where+woeid+in+%28select+woeid+from+geo.places%281%29+where+text%3D%27"+city_value+"%27%29&format=json", function(error, response, body) {
   var jsonObject = JSON.parse(body);
    var jsonval =  JSON.stringify(jsonObject, null,3);
    var query = jsonObject.query;
    var result = query.results;
    var channel = result.channel;
    var location = channel.location;
    var item = channel.item;
    var unit = channel.units;
    var condition = item.condition;
    valuesb = "Today's forcast for " +location.city+ " is " +condition.temp+ " "+unit.temperature+ "ahrenheit and "+condition.text;
  //console.log(body);
});
    return valuesb;
}

restService.post('/echo', function(req, res) {



    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.mathVal ? req.body.result.parameters.mathVal : "Di ko alam ang pinag sasabi mo.";



    var result = 0;
    var actions = req.body.result.action;
    var num = Number(req.body.result.parameters.num1);
    var num1 = Number(req.body.result.parameters.num2);

    if(actions == "yahooWeatherForecast"){
         result = valuesb;
    }else if(actions == "calculator"){
        switch(speech){
       case "Add":
            result = num + num1;
            break;
        case "Subtract":
            result = num - num1;
            break;
        case "Multiply":
            result = num * num1;
            break;
        case "Divide":
            result = num / num1;
            break;
    default:
        result = "Sorry I dont know the answer!"
        break;
    }
    }else{
       result = "Sorry i cant understand you"
    }


    return res.json({
        speech: result ,
        displayText: result,
        source: 'mel-webhook'
    });
});



restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
