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

    for(i = 0; i < obj.length; i++) {
      var current_date = new Date();
      var event_date = obj[i].end_time.split("T");

      //split into array of type ["year", "month", "day"]
      event_date = event_date[0].split("-");

      //check if the event has passed
      if ( current_date.getYear()   <= parseInt(event_date[0])  &&
           current_date.getMonth()  <= parseInt(event_date[1])  &&
          ((current_date.getMonth() == parseInt(event_date[1])) ||
           (current_date.getDate()  <= parseInt(event_date[2])) )) {

           //check if facebook provides the location
           if (obj[i].place.hasOwnProperty('location')) {
             create_facebookMarker(obj[i]);
           }
           else {
             //do a google search based on the name
             service.nearbySearch({
                 location: pyrmont,
                 radius: 500,
                 name: obj[i].place.name
             }, callback);
           }
        }
    }
}

function filterByDate(event_date) {
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

  for(i = 0; i < obj.length; i++) {

    //split into array of type ["year", "month", "day"]
    var obj_date = obj[i].end_time.split("T");
    obj_date = obj_date[0].split("-");

    //check if the event has passed
    if (event_date.indexOf(obj[i].name) != -1) {

         //check if facebook provides the location
         if (obj[i].place.hasOwnProperty('location')) {
           create_facebookMarker(obj[i]);
         }
         else {
           //do a google search based on the name
           service.nearbySearch({
               location: pyrmont,
               radius: 500,
               name: obj[i].place.name
           }, callback);
         }
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
    infowindow.setContent('<p style = "color: black";> ' + '<b>' + place.name  + '</b>' + '</p>')
    infowindow.open(map, this);
  });
}

function create_facebookMarker(an_event) {
  var placeLoc = an_event.place.location;
  var marker = new google.maps.Marker({
    map: map,
    position: {lat: an_event.place.location.latitude, lng: an_event.place.location.longitude},
  });

  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<a style = "color: black" title = "' + an_event.name + '" href = "https://facebook.com/events/' + an_event.id + '"> ' + '<b>' + an_event.name  + '</b>' + '</a> '
          + '<p style = "color: black";> ' + an_event.description + '</p> '
          + '<p style = "color: black";> ' + "Start Time: "  + moment(an_event.start_time).format("MM/DD hh:mm")  + '</p> '
        + '<p style = "color: black";> ' + "End Time: "  + moment(an_event.end_time).format("MM/DD hh:mm")  + '</p> ')
    infowindow.open(map, marker);
  });
}
