var APIKey = "f954ed6275dcbf562c6fb2740dba1913";
var cityName = "";
var searchedCities = [];


// This function handles events where the search button is clicked
$(".search-button").on("click", function(event) {
    event.preventDefault();

    cityName = $("#cityInput").val().trim();

    // Return from function early if submitted city field is blank
    //HELP: How do I exit function if user enteres invalid city name which produces a URL that returns a 404 page?
    if (cityName === "") {
        return;
    }

    searchedCities.push(cityName);

    // Here we are building the URL we need to query the database for current weather.
    var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
    // Here we are building the URL we need to query the database for 5 day forcast.
    var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API for current forcast.
    $.ajax({
        url: queryURLWeather,
        method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            // console.log(queryURLWeather);
            // console.log(response);

            // Display current weather results
            $("#currentWeather > .name").text(response.name);
            $("#currentWeather > .date").text(moment().format("dddd, MMMM Do YYYY"));
            $("#currentWeather > .icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            $("#currentWeather > .temperature").text("Temperature: " + response.main.temp + String.fromCharCode(176) + "F");
            $("#currentWeather > .humidity").text("Humidity: " + response.main.humidity);
            $("#currentWeather > .wind-speed").text("Wind Speed: " + response.wind.speed);
        });

    // Here we run our AJAX call to the OpenWeatherMap API for daily forecast.
    $.ajax({
        url: queryURLFiveDay,
        method: "GET"
        })
        .then(function(response) {
            // console.log(response);
            // Display 5 day forecast container
            $("#dailyForecast").attr("style", "display:block;");

            // Display current weather results
            //HELP: How can I loop this and display dynamically?
            $("#dailyForecastCards > #day1 .date").text(response.list[1].dt_txt);
            $("#dailyForecastCards > #day1 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day1 .temperature").text("Temperature: " + response.list[1].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day1 .humidity").text("Humidity: " + response.list[1].main.humidity);

            $("#dailyForecastCards > #day2 .date").text(response.list[2].dt_txt);
            $("#dailyForecastCards > #day2 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day2 .temperature").text("Temperature: " + response.list[2].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day2 .humidity").text("Humidity: " + response.list[2].main.humidity);

            $("#dailyForecastCards > #day3 .date").text(response.list[3].dt_txt);
            $("#dailyForecastCards > #day3 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day3 .temperature").text("Temperature: " + response.list[3].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day3 .humidity").text("Humidity: " + response.list[3].main.humidity);

            $("#dailyForecastCards > #day4 .date").text(response.list[4].dt_txt);
            $("#dailyForecastCards > #day4 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day4 .temperature").text("Temperature: " + response.list[4].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day4 .humidity").text("Humidity: " + response.list[4].main.humidity);

            $("#dailyForecastCards > #day5 .date").text(response.list[5].dt_txt);
            $("#dailyForecastCards > #day5 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day5 .temperature").text("Temperature: " + response.list[5].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day5 .humidity").text("Humidity: " + response.list[5].main.humidity);
        });

    // Calling the renderButtons function to display the initial list of cities
    renderCities();
});



// Function for displaying searched cities
function renderCities() {
    // Empty current city list before displaying next city name button
    $("#cityHistory").empty();

    // Loop through the array of cities entered, then generate list items for each city in the array
    for (var i = 0; i < searchedCities.length; i++) {
        var newCity = $("<a>");
        newCity.text(searchedCities[i]);
        newCity.attr('data-name', searchedCities[i]); 
        newCity.attr("href", "#");
        $("#cityHistory").append(newCity);
    }
}




