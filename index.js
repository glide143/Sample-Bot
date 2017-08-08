'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());



var valuesb = " ";

var city_value = "makati";

 /*request.get("http://query.yahooapis.com/v1/public/yql?q=select+%2A+from+weather.forecast+where+woeid+in+%28select+woeid+from+geo.places%281%29+where+text%3D%27"+city_value+"%27%29&format=json", 
function(error, response, body) {
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
});*/

var options = {
    url: 'http://query.yahooapis.com/v1/public/yql?q=select+%2A+from+weather.forecast+where+woeid+in+%28select+woeid+from+geo.places%281%29+where+text%3D%27'+city_value+'%27%29&format=json',
  headers: {
    'User-Agent': 'request'
  }
};

function callback(error, response, body) {
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
}

request(options, callback);

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







restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
