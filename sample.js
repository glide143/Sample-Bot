var request = require("request");

request.get("http://query.yahooapis.com/v1/public/yql?q=select+%2A+from+weather.forecast+where+woeid+in+%28select+woeid+from+geo.places%281%29+where+text%3D%27makati%27%29&format=json", function(error, response, body) {
    var jsonObject = JSON.parse(body);
    var jsonval =  JSON.stringify(jsonObject, null,3);
    var query = jsonObject.query;
    var result = query.results;
    var channel = result.channel;
    var location = channel.location;
    console.log(location.city);
  //console.log(body);
});
