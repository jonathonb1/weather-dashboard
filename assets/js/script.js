// js will only run on page load
$(document).ready(function () {

    // listen for button click within city search
    $("#search-btn").on("click", function () {

        // get search-value
        const searchValue = $("#search-value").val().trim();

        // call search weather function
        searchWeather(searchValue);
    })

    // fucnction for todays weather
    function searchWeather(cityName) {

        // query api
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=688988e3b9c619e778927f53f7761d5d`
        }).then(function (response) {
            console.log(response);
        })
    }

})


// weather API key
// 688988e3b9c619e778927f53f7761d5d