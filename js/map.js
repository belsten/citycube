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

    //get local json data for events
    text2 = localStorage.getItem("statham");
    obj = JSON.parse(text2);
    console.log(obj[0]);
    console.log(obj[5]);

    for(i = 0; i < obj.length; i++) {
      //console.log(obj);
      if (obj[i].place.hasOwnProperty('location')) {
        console.log("Has location");
        create_facebookMarker(obj[i]);
      }
      else {
        console.log("no location");
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            name: obj[i].place.name
        }, callback);
      }
    }
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    if (results.length > 0 ) {
        create_googleMarker(results[0]);
    }
  }
}

function create_googleMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function create_facebookMarker(an_event) {
  var placeLoc = an_event.place.location;
  var marker = new google.maps.Marker({
    map: map,
    position: {lat: an_event.place.location.latitude, lng: an_event.place.location.longitude},
    labelContent: "butt"
  });
  var infowindow = new google.maps.InfoWindow({
          content: '<div>' + '<p>arker Location:' + 'BUTT' + '</p>' + '</div>'
        });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<p style = "color: black";> ' + an_event.name  + '</p>')
    infowindow.open(map, marker);
  });
}
