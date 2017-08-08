var request = require("request");
//var city_value;
function weather(city_value){
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
    console.log("Today's forcast for " +location.city+ " is " +condition.temp+ ""+unit.temperature+ " and "+condition.text);
  //console.log(unit.temperature);
});
}
weather('makati');