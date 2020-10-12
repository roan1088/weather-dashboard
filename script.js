// When search button is clicked
$("#search-button").click(function(event) {
    // Prevent form submission from refreshing the page
    event.preventDefault();
    // Get city name from text input
    var userCity = $("#city-name").val();
    console.log(userCity);
});