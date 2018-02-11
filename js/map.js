// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;

function initMap() {
    var pyrmont = {lat: 42.8142, lng: -73.9396};
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['store']
    }, callback);
}

function callback(results, status) {
  text2 = localStorage.getItem("statham");
  obj = JSON.parse(text2);
  console.log(obj[0])

    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < obj.length; i++) {
            createMarker(obj[i]);
            console.log(obj[i].name)
        }
    }
}

function createMarker(an_event) {
    var placeLoc = an_event.place.location;
    console.log("lat:", an_event.place.location.latitude, " lng: ",an_event.place.location.longitude)
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: an_event.place.location.latitude, lng: an_event.place.location.longitude},
        title: "butt"
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(an_event.name);
        infowindow.open(map, this);
    });
}
