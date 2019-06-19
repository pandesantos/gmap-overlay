var locations = [
    {
        "name": "Location Example One",
        "latitude": 27.714875814507,
        "longitude": 85.31083881855,
        "currency": "NPR",
        "price": 1618
    },
    {
        "name": "Location Example Two",
        "latitude": 27.715531170943,
        "longitude": 85.310372114182,
        "currency": "NPR",
        "price": 2312
    },

    {
        "name": "Location Example Three",
        "latitude": 27.7138,
        "longitude": 85.3145,
        "currency": "NPR",
        "price": 2746
    },
    {
        "name": "Location Example Four",
        "latitude": 27.718714,
        "longitude": 85.31234,
        "currency": "NPR",
        "price": 3063
    },
    {
        "name": "Location Example Five",
        "latitude": 27.712278,
        "longitude": 85.309406,
        "currency": "NPR",
        "price": 3606
    },
    {
        "name": "Location Example Six",
        "latitude": 27.71517,
        "longitude": 85.31013,
        "currency": "NPR",
        "price": 3698
    },
    {
        "name": "Location Example Seven",
        "latitude": 27.700323901541,
        "longitude": 85.353371715779,
        "currency": "NPR",
        "price": 4680
    },

    {
        "name": "Location Example Eight",
        "latitude": 27.716995333812,
        "longitude": 85.31260288532,
        "currency": "NPR",
        "price": 4854
    },

    {
        "name": "Location Example Nine",
        "latitude": 27.711068187285,
        "longitude": 85.314954565641,
        "currency": "NPR",
        "price": 4975
    },
    {
        "name": "Location Example Ten",
        "latitude": 27.715142,
        "longitude": 85.310526,
        "currency": "NPR",
        "price": 5530
    }
];

var overlay;

function initMap() {
    var center = new google.maps.LatLng(locations[0]['latitude'], locations[0]['longitude']);

    var mapOptions = {
        zoom: 15,
        center: center,
        // scrollwheel: false,
        mapTypeControl: false
    };

    var noPoi = [
        {
            featureType: "poi.business",
            stylers: [
                {visibility: "off"}
            ]
        }
    ];

    var gmap = new google.maps.Map(document.getElementById('map'), mapOptions);

    HTMLMarker.prototype = new google.maps.OverlayView();

    // Initialize the map and the custom overlay.

    /** @constructor */
    function HTMLMarker(position, map, info) {

        // Initialize all properties.
        this.position = position;
        this.map_ = map;
        this.info_ = info;
        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
    }

    /**
     * onAdd is called when the map's panes are ready and the overlay has been
     * added to the map.
     */
    HTMLMarker.prototype.onAdd = function() {

        var div = document.createElement('div');
        div.className = "wrapper";

        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';

        var price = '<div class="info-pin"><span>'+this.info_.price+'</span></div>';
        var name = '<div class="info-pop-up"><p class="nm">'+this.info_.name+'</p></div>';
        div.innerHTML = price+name;

        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();

        panes.overlayImage.appendChild(div);
    };

    HTMLMarker.prototype.draw = function() {

        // coordinates of the overlay to peg it to the correct position.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        var point = overlayProjection.fromLatLngToDivPixel(this.position);

        var div = this.div_;
        div.style.left = point.x - 30 + 'px';
        div.style.top = point.y - 10 + 'px';

    };

    // The onRemove() method will be called automatically from the API if
    // we ever set the overlay's map property to 'null'.
    HTMLMarker.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    };

    gmap.setOptions({styles: noPoi});

    var position, i;

    for (i = 0; i < locations.length; i++) {

        position = new google.maps.LatLng(locations[i].latitude, locations[i].longitude);

        var price = Math.ceil(locations[i].price / 1000)+'K';

        var info = {
            price : locations[i].currency+' '+price,
            name : locations[i].name
        };

        var htmlMarker = new HTMLMarker(position,gmap, info);
    }

    var overlayMarker = document.getElementsByClassName('property-wrapper');


}


