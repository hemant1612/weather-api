var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });

})

function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
      url: urlString,
      success: function(result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      //$("#desc").text(result.weather[0].main);
      IconGen(result.weather[0].main);
    }
  });
}

/* a sample json response of the query above */
/*
{
  "coord":
{
  "lon":70,"lat":20
},
"weather":[{"id":804,"main":"Clouds","description":"overcast clouds",
"icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F04d.png?1499366020964"}],
"base":"stations",
"main":{"temp":27.57,"pressure":1015.2,"humidity":97,"temp_min":27.57,"temp_max":27.57,"sea_level":1015.26,"grnd_level":1015.2},
"wind":{"speed":8.6,"deg":254.504},
"clouds":{"all":88},"dt":1501931363,
"sys":{"message":0.0034,"country":"IN",
"sunrise":1501894617,"sunset":1501941282},
"id":1253237,"name":"Veraval","cod":200}
*/
/*render icon on the web page based on the desc*/

function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    case 'clouds':
      addIcon(desc)
      break;
    case 'rain':
      addIcon(desc)
      break;
    case 'snow':
      addIcon(desc)
      break;
    case 'clear':
      addIcon(desc)
      break;
    case 'thunderstom':
      addIcon(desc)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(desc) {
  $('div.' + desc).removeClass('hide');
}
