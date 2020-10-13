// Initialization
// Get search history from local history
var cityList = JSON.parse(localStorage.getItem("city-list"));
// If there is no data the list is empty
if (!cityList) {
    cityList = [];
}
// console.log(cityList);

// Function to render search history
function renderSearchHistory() {
    // Clear search history area
    $("#search-history").html("");
    // For each city in the list
    $.each(cityList, function(index, city) {
        // Create a list item
        var liEl = $('<li class="search-item">').text(city);
        $("#search-history").append(liEl);
    });

    // When a city from the search history is clicked
    $(".search-item").click(function(event) {
        // Prevent any default action
        event.preventDefault();

        // console.log("list item clicked");
        // Get city name
        var userCity = $(this).text();

        // Display the weather for the city
        renderWeather(userCity);
    });
}

// Function to update search history
function updateSearchHistory(cityName) {
    // If the city already exists in the list remove it
    if (cityList.includes(cityName)) {
        cityList.splice(cityList.indexOf(cityName), 1);
    }
    // Add that city to the beginning of the list
    var listLength = cityList.unshift(cityName);
    // If the list has more than 8 remove the oldest one
    if (listLength > 8) {
        cityList.pop();        
    }
    // Store the new list in local storage
    localStorage.setItem("city-list", JSON.stringify(cityList));
    
    // Display search history
    renderSearchHistory();
}

// Function that displays weather for a city
function renderWeather(cityName) {
    // Query URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=de67b8db375cf19f0a90a7d7e6edfda6&units=imperial&q=" + cityName;
    // Query
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // If successful
        // console.log(response);
        // Display info
        $("#city").text(response.name);
        $("#temperature").text("Temperature: " + response.main.temp + "\xb0F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind speed: " + response.wind.speed + " MPH");
        $("#uv-index").text("UV Index: ");
        // Update the search history
        updateSearchHistory(response.name);
    }).catch(function() {
        // If unsuccessful
        // console.log("invalid city");
        // Display error
        $("#city").text("Invalid city name");
        $("#temperature").text("");
        $("#humidity").text("");
        $("#wind-speed").text("");
        $("#uv-index").text("");
    });
}

// When search button is clicked
$("#search-button").click(function(event) {
    // Prevent form submission from refreshing the page
    event.preventDefault();

    // Get city name from text input
    var userCity = $("#city-name").val();

    // Display the weather for the city
    renderWeather(userCity);
});

// Code flow
renderSearchHistory();