var APIKey = "f954ed6275dcbf562c6fb2740dba1913";
var cityName = "";
var searchedCities = [];
var lat = "";
var lon = "";


$(document).ready(function() {
    function init() {
        // Get stored searchedCities from localStorage
        // Parsing the JSON string to an object
        var storedSearchedCities = JSON.parse(localStorage.getItem("searchedCities"));
    
        // If searchedCities were retrieved from localStorage, update the searchedCities array to it
        if (storedSearchedCities !== null) {
            searchedCities = storedSearchedCities;
        }
        // Render searchedCities to the DOM
        renderCities();
    }
    // Display searched cities from local storage
    init();
});


function storeSearchedCities() {
    // Stringify and set "searchedCities" key in localStorage to searchedCities array
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}


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
};



function renderCurrentWeather() {
        // Here we are building the URL we need to query the database for current weather.
        var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API for current forcast.
    $.ajax({
        url: queryURLWeather,
        method: "GET",
        // Exit function if user enteres invalid city name which produces a URL that returns a 404 page?
        error: function() {
            alert("Please enter a valid city name.");
        }
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        // console.log(queryURLWeather);
        console.log(response);
        // Display current weather results
        $("#currentWeather > .name").text(response.name);

        // Push VALID city name to array!
        searchedCities.push(response.name);

        $("#currentWeather > .date").text(moment().format("dddd, MMMM Do YYYY"));
        $("#currentWeather > .icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $("#currentWeather > .temperature").text("Temperature: " + response.main.temp + String.fromCharCode(176) + "F");
        $("#currentWeather > .humidity").text("Humidity: " + response.main.humidity);
        $("#currentWeather > .wind-speed").text("Wind Speed: " + response.wind.speed);

        // Store longitude and latiture in global variables
        var cityLon = response.coord.lon;
        var cityLat = response.coord.lat;
        lon = cityLon;
        lat = cityLat;

        // Display UV index
        renderUVindex();

        // Display the initial list of cities
        renderCities();

    });
};



function renderUVindex() {
    // Here we are building the URL we need to query the database for current weather.
    var queryURLuvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURLuvIndex,
        method: "GET"
    })

    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        // console.log(queryURLuvIndex);
        // console.log(response);

        // Store UX Index in global variable
        var UVindex = response.value;
        $("#currentWeather > .uv-index").text("UV Index: " + UVindex);
    });
};



function renderDailyWeather() {
    // Here we are building the URL we need to query the database for 5 day forcast.
    var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API for daily forecast.
    $.ajax({
        url: queryURLFiveDay,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);

            // Display 5 day forecast container
            $("#dailyForecast").attr("style", "display:block;");
        
            // Display current weather results
            //HELP: How can I loop this and display dynamically?
            $("#dailyForecastCards > #day1 .date").text(response.list[0].dt_txt);
            $("#dailyForecastCards > #day1 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day1 .temperature").text("Temperature: " + response.list[0].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day1 .humidity").text("Humidity: " + response.list[0].main.humidity);
        
            $("#dailyForecastCards > #day2 .date").text(response.list[8].dt_txt);
            $("#dailyForecastCards > #day2 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day2 .temperature").text("Temperature: " + response.list[8].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day2 .humidity").text("Humidity: " + response.list[8].main.humidity);
        
            $("#dailyForecastCards > #day3 .date").text(response.list[16].dt_txt);
            $("#dailyForecastCards > #day3 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day3 .temperature").text("Temperature: " + response.list[16].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day3 .humidity").text("Humidity: " + response.list[16].main.humidity);
        
            $("#dailyForecastCards > #day4 .date").text(response.list[24].dt_txt);
            $("#dailyForecastCards > #day4 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day4 .temperature").text("Temperature: " + response.list[24].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day4 .humidity").text("Humidity: " + response.list[24].main.humidity);
        
            $("#dailyForecastCards > #day5 .date").text(response.list[32].dt_txt);
            $("#dailyForecastCards > #day5 .icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + "@2x.png");
            $("#dailyForecastCards > #day5 .temperature").text("Temperature: " + response.list[32].main.temp + String.fromCharCode(176) + "F");
            $("#dailyForecastCards > #day5 .humidity").text("Humidity: " + response.list[32].main.humidity);
    });
};


// This function handles events where the search button is clicked
$(".search-button").on("click", function(event) {
    event.preventDefault();

    cityName = $("#cityInput").val().trim();

    // Return from function early if submitted city field is blank
    if (cityName === "") {
        return;
    }

    // Display today's weather
    renderCurrentWeather();

    // Display 5 day forecast
    renderDailyWeather();

    // Store searched cities into local storage
    storeSearchedCities();

    // REMOVED: This would push valid and invalid names due to location of code.
    // searchedCities.push(cityName);

});


$("#cityHistory").on("click", function(event) {
    cityName = event.target.getAttribute("data-name");

    $("#cityHistory").empty();

    // REMOVED: This would push twice - not nesessary since we've done that in the renderCurrentWeather() function!
    // searchedCities.push(cityName);

    // Display today's weather
    renderCurrentWeather();
    // Display 5 day forecast
    renderDailyWeather();
    // Display the initial list of cities
    renderCities();
    // Store searched cities into local storage
    storeSearchedCities();
});








