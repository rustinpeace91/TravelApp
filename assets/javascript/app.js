$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBNsIe37RELMNqecsYHHWmmhcw59jQkf88",
        authDomain: "practicaltravel-63ff1.firebaseapp.com",
        databaseURL: "https://practicaltravel-63ff1.firebaseio.com",
        projectId: "practicaltravel-63ff1",
        storageBucket: "",
        messagingSenderId: "600055377899"
    };
    // set a reference to the database service
    firebase.initializeApp(config);

    // global variables
    var city;
    var database = firebase.database();
    var numSearched = 1

    $("#submit-data").on("click", function () {
        // Capture User Inputs and store them into variables
        city = $("#destination").val().trim();
        date = $("#date").val().trim();
        console.log($("#destination").val().trim())
        console.log($("#date").val().trim());

        // Clear the input boxes on the screen and replace with placer text
        $("#destination").val("City, Country");
        $("#date").val("Month of Travel");

        // add recent search to screen
        $("#recent-searches").append(city)

        // Add new input to the firebase database
        database.ref('travelPlans').push({
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
            city: city,
            numSearched: 1,

        });
    });

    // Getty Images API
    //Search for images with an api key and show the output
    var apiKey = 'zd7c8j455yjfnjcmxvnhrdn8';

    $.ajax(
        {
            type: 'GET',
            url: "https://api.gettyimages.com/v3/search/images/creative?phrase=" + city + "",
            beforeSend: function (request) {
                request.setRequestHeader("Api-Key", apiKey);
            }
        })

        .done(function (data) {
            console.log(data)
            for (var i = 0; i < 10; i++) {
                $(".slideshow").append("<img src='" + data.images[0].display_sizes[0].uri + "'/>");
            }
        })
        .fail(function (data) {
            alert(JSON.stringify(data, 2))

        });

        // slideshow
    $(document).ready(function(){
      $('.slideshow').slick({
     //   setting-name: setting-value
      });
    });



  </script>
        

    // Resteraunt API 
    $("#submit-data").on("click", function () {

        cityPlaceApi = $("#destination").val().trim();
        console.log($("#destination").val().trim())
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + cityPlaceApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8",
            method: "get"
        }).then(function (data) {
            results = data;
            console.log(data);
            $("#rest-address").append("<div>" + data.results[0].name + "</div>")
            $("#rest-address").append("<div>" + data.results[0].formatted_address + "</div>")
            //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
            $("#rest-address").append("<div>" + data.results[1].name + "</div>")
            $("#rest-address").append("<div>" + data.results[1].formatted_address + "</div>")
            //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
            $("#rest-address").append("<div>" + data.results[2].name + "</div>")
            $("#rest-address").append("<div>" + data.results[2].formatted_address + "</div>")
            //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
        });
    });

    //search?source=hp&ei=MG22WvH-LMbm_QbgjqDYDw&q=health+information+in+philadelphia&oq=health+information+in+philadelphia&gs_l=psy-ab.3..33i22i29i30k1l4.1719.7120.0.7301.36.29.0.6.6.0.154.1935.24j4.29.0....0...1c.1.64.psy-ab..1.35.2001.6..0j35i39k1j0i131k1j0i67k1j0i131i67k1j0i20i263k1j0i22i30k1j0i8i13i30k1.48.ygbpj7BRdQY
    $("#submit-data").on("click", function () {
        cityHealthApi = $("#destination").val().trim();
        console.log($("#destination").val().trim())
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=health+information+in+" + cityHealthApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8",
            method: "get"
        }).then(function (responseCityHealth) {
            results = responseCityHealth;
            console.log(responseCityHealth);
            //$("#restaurant").html("<div>" + response.results[0].name + "</div>")
            //$("#restaurant").append("<div>" + response.results[0].formatted_address + "</div>")
            //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
        });
    });
});


//UGLY URL VARIABLES//
//var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=beeeb0200ae49646011f7917db233044";
var googleMapsTimeZoneQueryURL = "https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyACzWLfVVhDTJc2ivhNQio_LjbUrLfYViU";
var googleCustomSearchAPIKey = "AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus";
var googleCustomSearchURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus&cx=017576662512468239146:omuauf_lfve&q=lectures";

//IDs NEEDED: "map", "submit-data", "weather", "destination"

var city = "Rome, Italy";
var results = undefined;
var coord = { lat: 0, lng: 0 };
var dateAndTime = "";

function initMap(coord) {
    var uluru = coord;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

    $("#submit-data").on("click", function (event) {
        event.preventDefault();
        city = $("#destination").val().trim();
        console.log(city);
        //console.log($("#destination").val().trim())
        $("#weather").empty();

        //OPEN WEATHER API
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=beeeb0200ae49646011f7917db233044",
            method: "get"
        }).then(function (response) {
            results = response;
            console.log(response);
            console.log(response.name);
            console.log(response.main.temp);
            coord.lat = response.coord.lat;
            coord.lng = response.coord.lon;
            //coords
            initMap(coord);
            $("#weather").html("<p>" + response.main.temp + "</p>")
        });

        $.ajax({
            url: googleMapsTimeZoneQueryURL,
            method: "get"
        }).then(function (response) {
            results = response;
            console.log(response);
        });
        $("#weather").append("<p>" + response.main.temp + "ºF</p>")
        timeZone();
    });

    //TIMEZONEDB
    function timeZone() {
        $.ajax({
            url: "https://api.timezonedb.com/v2/get-time-zone?key=GDN58Z4BNM7G&format=json&by=position&lat=" + coord.lat + "&lng=" + coord.lng,
            method: "get"
        }).then(function (response) {
            results = response;
            console.log(response);
            //v2/resources/media/console.log(response);
            var foreignTime = moment(response.formatted);
            console.log(foreignTime.format("HH:mm MM/DD/YYYY"));
            dateAndTime = foreignTime.format("HH:mm MM/DD/YYYY");
            $("#weather").append("<p>" + dateAndTime + "</p>");
        });

    }
    //https://cors-anywhere.herokuapp.com
});

//API KEY:beeeb0200ae49646011f7917db233044
//var googleMapsAPI = "";/*<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC-gMBFX829n7IjoF8DIJMnBO77IQ8JgRc&callback=initMap'async defer></script>*/
//https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
//FozN4hA9DAjuptuej3UXIG5BT0mmLcrTx_LQEFyRUxSmJuGYe5Zic3os-8GGQPiv0TSfvxz6lkfxmyEvM0st4OFKA3kJE5bEMGQBpL8NuOlW-WXAWsOLO5ykfVCwWnYx

// var placesQueryURL ="https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + cityPlaceApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8";


// //google api key     AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8

//         $.ajax({
//           url: placesQueryURL,
//           method: "GET",
//         }).then(function (data) {
// // var place = response.results.name;
//             console.log(data);
// });

//--------------------------YUCK--------------------------------------------------------->

//actual variables
//UGLY URL VARIABLES//
//var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=beeeb0200ae49646011f7917db233044";

//var googleCustomSearchAPIKey = "AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus";
//var googleCustomSearchURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus&cx=017576662512468239146:omuauf_lfve&q=lectures";

/*
            $.ajax({
                url:"https://tools.cdc.gov/api/v2/resources/media?topicids=6241",
                method: "get"
            }).then(function(response){
               results = response;
               console.log(results);
               //ID:6240
            });
*/
//--------------------------YUCK--------------------------------------------------------->
//IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! 

//API KEY:beeeb0200ae49646011f7917db233044
//var googleMapsAPI = "";/*<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC-gMBFX829n7IjoF8DIJMnBO77IQ8JgRc&callback=initMap'async defer></script>*/
//https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
//FozN4hA9DAjuptuej3UXIG5BT0mmLcrTx_LQEFyRUxSmJuGYe5Zic3os-8GGQPiv0TSfvxz6lkfxmyEvM0st4OFKA3kJE5bEMGQBpL8NuOlW-WXAWsOLO5ykfVCwWnYx
