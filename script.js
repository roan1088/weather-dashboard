// Initialization
// Get search history from local history
var cityList = JSON.parse(localStorage.getItem("city-list"));
// If there is no data the list is empty
if (!cityList) {
    cityList = [];
}
console.log(cityList);

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
}

// When search button is clicked
$("#search-button").click(function(event) {
    // Prevent form submission from refreshing the page
    event.preventDefault();

    // Get city name from text input
    var userCity = $("#city-name").val();
    // Add that city to the beginning of the list
    var listLength = cityList.unshift(userCity);
    // If the list has more than 8 remove the oldest one
    if (listLength > 8) {
        cityList.pop();        
    }
    // Store the new list in local storage
    localStorage.setItem("city-list", JSON.stringify(cityList));
    
    // Display search history
    renderSearchHistory();

    // console.log(newListSize);
});

// Code flow
renderSearchHistory();