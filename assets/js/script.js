var APIKey = "f954ed6275dcbf562c6fb2740dba1913";
var cityName = "";
var savedCities = [];


// Function for displaying searched cities
function renderCities() {
    $("#cityHistory").empty();

    // Loop through the array of cities entered, then generate list items for each city in the array
    for (var i = 0; i < savedCities.length; i++) {
        var newCity = $("<a>");
        newCity.text(savedCities[i]);
        newCity.attr('data-name', savedCities[i]); 
        newCity.attr("href", "#");
        $("#cityHistory").append(newCity);
    }
}



// This function handles events where the search button is clicked
$(".search-button").on("click", function(event) {
    event.preventDefault();

    cityName = $("#cityInput").val().trim();

    savedCities.push(cityName);


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

    renderCities();
});

// Calling the renderButtons function to display the initial list of cities
renderCities();




