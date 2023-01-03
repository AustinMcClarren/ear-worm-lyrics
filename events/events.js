$(document).ready(function () {

    console.log("lat and long information");
   

  

    //event handler for search 

    $(document).on("click", "#search-button", function (event) {
        event.preventDefault();
        //stores artist name
        var inputArtist = $("#search-box").val().trim();

        console.log(inputArtist);
        $("#event-amount").empty();
        $('tbody').empty();

    
        // Running the searchBandsInTown function
        searchBandsInTown(inputArtist);
        showArtistEvents(inputArtist);


    });

    //Function to search BandsinTown API



    //Function to seach BandsinTown API
    function searchBandsInTown(artist) {

        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/?app_id=codingbootcamp";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Printing the entire object to console

           
            let artistName = $("<h3>").text(response.name);
            var artistURL = $("<a>").attr("href", response.url).append(artistName);
            var artistImage = $("<img>").attr("src", response.thumb_url);
            var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
            let upcomingEvents = $("<h3>").text(response.upcoming_event_count + " Upcoming Events");
            var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

            $("#event-amount").append(upcomingEvents, artistName);
        
        });
    }


    function showArtistEvents(artist) {


        let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?limit=20&app_id=codingbootcamp";

        // Querying the bandsintown api for the selected artist
        //?app_id parameter is required, but can equal anything
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?limit=20&app_id=codingbootcamp";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

    
            let limit = response.length > 8 ? 8 : response.length;
            for (var i = 0; i < limit; i++) {

                var eventData = response[i];
                var newDate = moment(eventDate).format('lll');
                // var ticketURL = eventData.offers[0].url;

            

                var eventDate = eventData.datetime
                var eventVenue = eventData.venue.name
                var eventCity = eventData.venue.city
                var eventReg = eventData.venue.region;
                var eventLat = eventData.venue.latitude;
                var eventLng = eventData.venue.longitude;
                var ticketURL = eventData.offers[0].url;
                console.log("ticket url:" + eventData.offers[0].url);
                console.log(eventLat)
                console.log(eventLng)
                var mapUrl = "https://www.google.com/maps/search/?api=1&query=" + eventLat + "," + eventLng;

                $('table').find('tbody').append(
                    `<tr class="dateeventcity">
                    <td class="dateCol">${newDate}</td>
                    <td class="venueCol">${eventVenue}</td>
                    <td class="locCol">${eventCity},${eventReg}</td>
                    <td class="urlCol"><button class='ticketBut  btn-sm'>Buy<a href="${ticketURL}" target="_blank"></a></button></td>
                    <td class ="mapButCol"><button class="mapBut btn-sm " data-lat="${eventLat}" data-long="${eventLng}">Map It!</button>
                </tr>`

                )

            }
        })
    }
//shows error if not found
    $(document).ajaxError(function (e, jqXHR, settings, err) {
        $("#event-amount").text("Artist Not Found");

        console.log("In global error callback.");

    });
//changes map destination
    $("body").on("click", ".mapBut", function (e) {
        let latit = parseFloat($(this).attr("data-lat"));
        let long = parseFloat($(this).attr("data-long"));


        console.log("lat (%d) and long (%d)", latit, long)
        initMap(latit, long);
        console.log("lat & long are changing")
    });





});

function initMap(lati, long) {
    console.log("=====================INIT MAP FUNCTION====================")
    let lat = lati || 33.759247;
    let lng = long || -84.387722;
    var pos = { lat, lng };
    console.log(pos)
    map = new google.maps.Map(document.getElementById('map-div'), {
        zoom: 16,
        center: pos
    });
    let marker = new google.maps.Marker({
        position: pos,
        map: map
    });

}