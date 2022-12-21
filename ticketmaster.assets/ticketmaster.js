var locationObjects = [];
var center = { lat: 39.7392, lng: -104.9903 };
var ticketMasterRespondObjects = [];
var cityForCenter = "";


function onCreation() {
    $("document").ready(function () {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDgBiTT1tZkPzoAwQORSah0mfdrgq5vht0",
            authDomain: "trendroomproject.firebaseapp.com",
            databaseURL: "https://trendroomproject.firebaseio.com",
            projectId: "trendroomproject",
            storageBucket: "trendroomproject.appspot.com",
            messagingSenderId: "800339938200"
        };

        firebase.initializeApp(config);

        var database = firebase.database();

        dropDownCat(database);
        dropDownCity(database);

        var userSelectCity, userSelectCat;
        generateQuery()
    });
}

onCreation();
 
/// initialize the map
function initMap() {

    var incr = 0;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center
    });

    locationObjects.forEach(location => {
        var latitude = location.latitude;
        var longitude = location.longitude;
        var eventId = "#tmEvent" + incr;
        incr++;

        var marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            ourAppId: eventId,
        });

        marker.addListener('click', function () {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                window.setTimeout(
                    function () {
                        marker.setAnimation(null);
                    },
                    1300
                );
            }
            console.log(this.ourAppId);
            scrollToCard(this.ourAppId);
        });
    });
};

/// Returns a location object with lat and long

function makeLocationObject(lat, long) {
    return {
        latitude: lat,
        longitude: long
    };
}


function createCards() {
    $("#events").html("");

    for (var i = 0; i < ticketMasterRespondObjects.length; i++) {
        var ticketlink = ticketMasterRespondObjects[i].ticketPurchase;

        var thehtml = `
                 <div class="card" id="tmEvent${i}">
                 <div class="card-header">
                     <h6>${ticketMasterRespondObjects[i].name}</h6>
                     <p>${ticketMasterRespondObjects[i].playingAtVenue}</p>
                 </div>
                 <div class="card-body">
                     <div class="col-7">
                         <img src="${ticketMasterRespondObjects[i].image}" width="100%">
                     </div>
                     <div class="col-5">
                         <p>${ticketMasterRespondObjects[i].date}</p>
                         <p>${ticketMasterRespondObjects[i].genre} ${ticketMasterRespondObjects[i].segment}</p>
                         <a href="${ticketlink}" target="_blank" class="btn btn-primary btn-sm">See Ticket</a>
                         </div>
                 </div>
                 </div>
                 `
        console.log("ticketsxxxxx :" + ticketMasterRespondObjects[i].ticketPurchase);

		$("#events").append(thehtml)
    };
}

function scrollToCard(id) {
    var $container = $('#events'),
        $scrollTo = $(id);

    console.log("entered function");

    $container.scrollTop(
        $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
    );

 
}
