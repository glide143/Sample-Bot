'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.math ? req.body.result.parameters.math : "Di ko alam ang pinag sasabi mo.";

    var mathVal = req.body.result.parameters.mathVal;

    var result = 0;
    
    var num = Number(req.body.result.parameters.num1);
    var num1 = Number(req.body.result.parameters.num2);
    switch(speech){
        case "Add":
            result = sumHandler(num,num1);
            break;
        case "Subtract":
            result = subHandler(num,num1);
            break;
        case "Multipy":
            result = multiHandler(num,num1);
            break;
        case "Divide":
            result = divHandler(num,num2);
            break;
    default:
        speech = req.body.result.parameters.math : "Please choose amoung the four options";
        break;
    }
    return res.json({
        speech: result,
        displayText: result,
        source: 'mel-webhook'
    });
});

function sumHandler (var num1,var num2) {
    var sum = num1 + num2;
    return sum;
}


function subHandler (var num1,var num2) {
    var sub = num1 - num2;
    return sub;
}

function multiHandler (var num1,var num2) {
    var multi = num1 * num2;
    return multi;
}

function divHandler (var num1,var num2) {
    var div = num1 / num2;
    return div;
}

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
