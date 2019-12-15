var APIKey = "f954ed6275dcbf562c6fb2740dba1913";
var cityName = "Richmond";

// Here we are building the URL we need to query the database for current weather.
var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
// Here we are building the URL we need to query the database for 5 day forcast.
var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API for current forcast.
$.ajax({
    url: queryURLWeather,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        console.log(queryURLWeather);
        console.log(response);
    });


// Here we run our AJAX call to the OpenWeatherMap API for daily forecast.
$.ajax({
    url: queryURLFiveDay,
    method: "GET"
    })
    .then(function(response) {
        console.log(queryURLFiveDay);
        console.log(response);
    });