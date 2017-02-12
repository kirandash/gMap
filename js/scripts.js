//Global map variable
var map;

//Function run on DOM load
function loadMap() {
    
    //Set the map options
    var mapOptions = {

        //Zoom on load
        zoom: 18,

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
        mapTypeId: google.maps.MapTypeId.SATELLITE,

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
        }
    };

    //Get the id of the map container div
    var mapId = document.getElementById('map');

    //Create the map
    map = new google.maps.Map(mapId,mapOptions);
      
}

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       



