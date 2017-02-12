//Global map variable
var map;

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
        center: new google.maps.LatLng(25.767,-80.1363),

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

    //Marker Creation
    var newMarker = this.addMarker();

    /*
    //Update lat lng after map is created
    updateCurrentLatLng(map.getCenter());

    //Update url once map is loaded
    updateUrlLocation(map.getCenter(), map.getZoom());

    //Call map event listeners function so that all events are bind to map after it is created
    mapEventListeners();*/
      
}

//Add a marker to the map
function addMarker(){
    //create the marker (#markeroptions)
    var marker = new google.maps.Marker({
        //Postion of marker
        position: new google.maps.LatLng(25.767,-80.1363),
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
        draggable: true,

        //Set the cross underneath the draggable marker
        crossOnDrag: false,

        //Set the opacity
        opacity: 0.8,

        //Set the title when mouse hovers
        title: 'New York NY (JFK)',

        //Set visibility
        visible: true,

        //Sets the zindex if multiple markers are displayed
        zindex: 1

    });

    marker.setMap(map); //displayin marker either through map option or using setMap
    marker.setVisible(true);//show or hide the icons

    return marker;
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

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());