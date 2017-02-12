//Global map variable
var map;

var infoWindow = new google.maps.InfoWindow();

//Get the location to display the coordinates
var lat = document.getElementById('latcoords');
var lng = document.getElementById('loncoords');

//Style Elements (Use snazzymaps.com)
/*var mapStyle = [
    {
        //If featuretype is not defined this style will apply to all features on map
        'stylers':[
            {'saturation':-100}, //decrease color saturation
            {'gamma':1}
        ]
    },
    {
        // This style for all features but specific elements - labels text
        'elementType':'labels.text.stroke',
        'stylers':[
            {'visibility':'on'}
        ]
    },
    {
        'featureType':'road',
        'elementType':'geometry',
        'stylers':[
            {'visibility':'simplified'}
            // If turned on all the secondary roads will be displayed
        ]
    },
    {
        'featureType':'water',
        'stylers':[
            //Visibility should be on to overwrite the global stylers
            {'visibility':'on'},
            {'saturation':50},
            {'gamma':0},
            {'hue':'#50a5d1'}
        ]
    },
    {
        'featureType':'landscape',
        'elementType':'all',
        'stylers':[
            {'color':'#e2e2e2'}
        ]
    }
];*/

//Function run on DOM load
function loadMap() {
    
    //Set the map options
    var mapOptions = {

        //Zoom on load
        zoom: 5,

        //Map center
        center: new google.maps.LatLng(40.6413111,-73.77813909),

        //Limit Min/Max Zoom
        /*minZoom: 10,
        maxZoom: 12,*/

        //Map control
        mapTypeControl: true,
        mapTypeControlOptions: {
            /* Map controls can be set to DROPDOWN MENU from default horizontal */
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            /* Map control options */
            mapTypeIds: [google.maps.MapTypeId.ROADMAP,
                         google.maps.MapTypeId.SATELLITE,
                         google.maps.MapTypeId.HYBRID,
                         google.maps.MapTypeId.TERRAIN
                        ],
            /* Map control positions - 12 choices */
            position: google.maps.ControlPosition.TOP_RIGHT
        },

        //Set MapType (Default Map Layer before choosing any of the 4 options)
        mapTypeId: google.maps.MapTypeId.ROADMAP,

        //Only valid for SATELLITE and TERRAIN, Note that min and max zoom should be removed for this
        tilt: 45,

        //Zoom Controls
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP
        },

        //Pan Controls
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },

        //Street View Control
        streetViewControl: true,

        //Overview map
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: true
        },

        //Set the map style
        styles: cladmeMapStyle
    };

    //Get the id of the map container div
    var mapId = document.getElementById('map');

    //Create the map
    map = new google.maps.Map(mapId,mapOptions);

    for(var i=0;i<airportData.length; i++){
        
        var airport = airportData[i];

        //Avg. percentage
        airport.totalper = (airport.aper + airport.dper)/2;

        //Total Flights
        airport.totalflights = (airport.aop + airport.dop);

        //Set the icon color
        airport.icon = 'green';

        //Set the icon size
        airport.iconsize = new google.maps.Size(32,32);

        //Marker Creation
        var newMarker = this.addMarker(airport);

        //Bind the airport data to marker - binding it to the marker object benefits us since we don't have to create variables to store data
        newMarker.airport = airport;

        //Info Window function
        addInfoWindow(newMarker);        
    }

    //Click on a marker by default to show an info window by default
    //google.maps.event.trigger(newMarker, 'click');

    /*
    //Update lat lng after map is created
    updateCurrentLatLng(map.getCenter());

    //Update url once map is loaded
    updateUrlLocation(map.getCenter(), map.getZoom());

    //Call map event listeners function so that all events are bind to map after it is created
    mapEventListeners();*/
      
}

//Add a marker to the map
function addMarker(airport){

    //create the marker (#markeroptions)
    var marker = new google.maps.Marker({
        //Postion of marker
        position: new google.maps.LatLng(airport.lat,airport.lng),
        //map: map, 
        icon: {
            url: 'img/airplane-green.png',
            size: new google.maps.Size(32,32),//width and height
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(16,32), //horizontal center and vertical bottom
            scaledSize: new google.maps.Size(32,32)//scaled to this size
        },

        //Set the animation (Bounce or Drop)
        animation: google.maps.Animation.DROP,

        //Sets whether marker is clickable
        clickable: true,

        //Drag marker
        draggable: false,

        //Set the cross underneath the draggable marker
        crossOnDrag: false,

        //Set the opacity
        opacity: 0.9,

        //Set the title when mouse hovers
        title: airport.airport,

        //Set visibility
        visible: true,

        //Sets the zindex if multiple markers are displayed
        zindex: 1

    });

    marker.setMap(map); //displayin marker either through map option or using setMap
    marker.setVisible(true);//show or hide the icons

    return marker;
}

function addInfoWindow(marker) {

    var details = marker.airport;

    //Content string 
    var contentString = '<div class="infowindowcontent">'+
        '<div class="row">' +
        '<p class="total '+details.icon+'bk">'+Math.round(details.totalper*10)/10+'%</p>'+//One decimal value only
        '<p class="location">'+details.airport.split("(")[0].substring(0,19)+'</p>'+ // Remove anything after ( and show only the first 20 characters
        '<p class="code">'+details.code+'</p>'+
        '</div>'+
        '<div class="data">'+
        '<p class="tagbelow">Avg On-Time</p>'+
        '<p class="label">Arrivals</p>'+
        '<p class="details">'+details.aper+'% ('+numberWithCommas(details.aop)+')</p>' + //Show number with commas
        '<p class="label">Departures</p>'+
        '<p class="details">'+details.dper+'% ('+numberWithCommas(details.dop)+')</p>' +        
        '<p class="coords">'+details.lat+' , '+details.lng+'</p>' +
        '</div>'+
        '</div>';

    //Create the infowindow - Commented to create the window globally - one for all
    /*
    var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: false, //If set to true it will pan the map and take full view
        maxWidth: 300,
        zindex: 1
    });
    */

    //Click event Listener
    google.maps.event.addListener(marker, 'click', function(e){
        
        //Close existing infowindow
        infoWindow.close();

        //Dynamically update content of infowindow
        infoWindow.setContent(contentString);

        //Open the infoWindow on click
        infoWindow.open(map, marker);
    });
}

/*
function mapEventListeners(){
    
    //Mousemove Update the coordinates
    var mouseMoveChanged = google.maps.event.addListener(map, 'mousemove', 
        function(event){
            //Update the coordinates
            updateCurrentLatLng(event.latLng);
            //The event contains lat and lng data
        }
    );

    //Right click control to zoom in the map
    var mouseDoubleClick = google.maps.event.addListener(map, 'rightclick', 
        function(event){
            //Keep zoom loop between 11 to 16
            var z = map.getZoom() + 1;
            if(z < 16) {
                map.setZoom(z);
            }else{
                map.setZoom(11);
            }
            //On right click set the current position to center
            map.setCenter(event.latLng);
        }
    );

    //Wait for map to load
    var listenerIdle = google.maps.event.addListenerOnce(map, 'idle', 
        function(){
            //alert('Map is ready!');
        }
    );

    //Drag End
    var listenerDragEnd = google.maps.event.addListener(map, 'dragend',
        function() {
            updateUrlLocation(map.getCenter(), map.getZoom());
        }
    );

    //Zoom Changed
    var listenerZoomChanged = google.maps.event.addListener(map, 'zoom_changed',
        function() {
            updateUrlLocation(map.getCenter(), map.getZoom());
        }
    );
}

//Update the position of mouse in lattitued and longitude
function updateCurrentLatLng(latLng){
    //Update the coordinates
    lat.innerHTML = latLng.lat();
    lng.innerHTML = latLng.lng();
}

//Update the URL with the map center and zoom - So that user can take the url and provide to someone else.
function updateUrlLocation(center, zoom){
    var lat = center.lat();
    var lng = center.lat();
    var url = '?lat='+lat+'&lon='+lng+'&zoom='+zoom;
    //Set the URL - using html5 pushshate - Note that objects can't be pushed to pushState
    window.history.pushState({lat:lat,lng:lng,zoom:zoom}, 'map center', url);
}
*/

//Add Commas to number
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());