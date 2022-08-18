// js will only run on page load
$(document).ready(function () {

    // listen for button click within city search
    $("#searchBtn").on("click", function () {
        console.log('test')
    })
    // get search-value
    const searchValue = $("#search-value").val().trim();
})


// weather API key
// 688988e3b9c619e778927f53f7761d5d