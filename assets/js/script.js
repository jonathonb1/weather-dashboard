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


        // Clear out today div
        $("#today").empty();

        // query api
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=688988e3b9c619e778927f53f7761d5d`
        }).then(function (response) {
            console.log(response);

            // extracting data from response
            const name = response.name;
            const wind = response.wind.speed;
            const humidity = response.main.humidity;
            const temperature = response.main.temp;


            console.log(name, wind, humidity, temperature);
            // card title
            const titleEl = $("<h3>").addClass("card-title").text(`${name} (${new Date().toLocaleDateString()})`);

            // creating card
            const cardEl = $("<div>").addClass("card");

            // Card content
            const cardBodyEl = $("<div>").addClass("card-body");

            // data from weather api
            const windEl = $("<p>").addClass("card-text").text(`Wind Speed: ${wind} MPH`);
            const humidEl = $("<p>").addClass("card-text").text(`Humidity: ${humidity}`);
            const tempEl = $("<p>").addClass("card-text").text(`Temerature: ${temperature}`);

            // add all data into card

            // append data into body section
            cardBodyEl.append(titleEl, tempEl, humidEl, windEl);

            // append onto card element
            cardEl.append(cardBodyEl);

            // append onto html page
            $("#today").append(cardEl);



        })
    }

})


// weather API key
// 688988e3b9c619e778927f53f7761d5d

