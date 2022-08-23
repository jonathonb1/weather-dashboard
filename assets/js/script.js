// js will only run on page load
$(document).ready(function () {

    // create an array of cities
    const cities = ["Sacramento", "San Jose"];

    // listen for button click within city search
    $("#search-btn").on("click", function () {

        // get search-value
        const searchValue = $("#search-value").val().trim();

        // add new button to array
        cities.push(searchValue);

        // call search weather function
        searchWeather(searchValue);

        // render new button
        renderButtons();
    })

    // fucnction for todays weather
    function searchWeather(cityName) {


        // Clear out today div
        $("#today").empty();

        // query api
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=688988e3b9c619e778927f53f7761d5d`
        }).then(function (response) {
            console.log(response);

            // extracting data from response
            const name = response.name;
            const wind = response.wind.speed;
            const humidity = response.main.humidity;
            const temperature = response.main.temp;
            const img = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;
            // const latitude = response.coord.lat;
            // const longitude = response.coord.lon;

            // console.log(name, wind, humidity, temperature, img);
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
            const imgEl = $("<img>").attr("src", img);

            // add all data into card
            titleEl.append(imgEl);

            // append data into body section
            cardBodyEl.append(titleEl, tempEl, humidEl, windEl);

            // append card body onto card element
            cardEl.append(cardBodyEl);

            // append onto html page
            $("#today").append(cardEl);

            getForecast(name);

        })
    }

    function getForecast(cityName) {
        $.ajax({
            type: "Get",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=688988e3b9c619e778927f53f7761d5d`
        }).then(function (response) {

            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast: </h4>").append("<div class=\"row\">");

            // looping over forecasts
            for (var i = 0; i < response.list.length; i += 8) {

                // creating column
                const colEl = $("<div>").addClass("col-md-2");

                // creating card
                const cardEl = $("<card>").addClass("card bg-primary text-white");

                // card body
                const cardBodyEl = $("<div>").addClass("card-body p-2");

                // extrct data from current element
                const titleEl = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
                const imgEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`)
                const tempEl = $("<p>").addClass("card-text").text(`Temp: ${response.list[i].main.temp_max}`);
                const humidityEl = $("<p>").addClass("card-text").text(`Humidity: ${response.list[i].main.humidity}`);

                // append all data to card
                cardBodyEl.append(titleEl, imgEl, tempEl, humidityEl);
                cardEl.append(cardBodyEl);

                // append finished card to column
                colEl.append(cardEl);

                // append column onto row
                $("#forecast .row").append(colEl);
            }
        })
    }

    function renderButtons() {

        $(".cities").empty();
        for (let i = 0; i < cities.length; i++) {
            // create list item
            const listItem = $("<li>").addClass("current-city list-group-item list-group-item-action").attr("data-city", cities[i]).text(cities[i]);
            $(".cities").append(listItem);
        }
    }

    $(document).on("click", ".current-city", function () {

        // get city name from selection
        const cityName = $(this).attr("data-city");
        searchWeather(cityName);
    })

    //  on page load
    renderButtons();
})


// weather API key
// 688988e3b9c619e778927f53f7761d5d

