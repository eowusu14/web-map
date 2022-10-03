//initialise map
var map = L.map('map').setView([7.9, -1.09], 7);

//add base maps
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
.addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
//.addTo(map);

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
//.addTo(map);

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
//.addTo(map);

//adding marker
//var marker = L.marker([7,-1]).addTo(map)

// add geojson layers
// region layer style
var regionStyle = {
color : 'green',
opacity : 0.1,
weight: 2,
fill: true

}

// colleges layer style
var collegesStyle = {
    // fillColor: 'yellow',
    // radius: 5,
    // color: 'black',
    // weight: 2,
    // fillopacity: 9

    shape: "triangle",
	radius: 5,
	fillColor: "black",
	fillOpacity: 1,
	color: "white",
	weight: 1
}

// healthsite layer style
var healthSiteStyle = {
    fillColor: 'white',
    radius: 5,
    color: 'red',
    weight: 2
}

// railway layer style
var railwayStyle = {
    color: 'black',
    weight: 2,
    dashArray: "10 10 15"

}

var regionlayer = L.geoJSON(region, {
    style: regionStyle,
    onEachFeature: function(feature, layer){
        layer.bindPopup(feature.properties.region)
    }

})
//.addTo(map)


var collegeslayer = L.geoJSON(colleges, {
    pointToLayer: function(feature, latlng) {
        return L.shapeMarker(latlng, collegesStyle);
    }

}).bindPopup(function (layer) {
    return layer.feature.properties.name

})
//.addTo(map);

var healthsitelayer = L.geoJSON(healthfacilities, {
    style: healthSiteStyle,
    pointToLayer: function(geoJsonPoint, latlng) {
    return L.circleMarker(latlng);
}

}).bindPopup(function (layer) {
    return layer.feature.properties.name;
}).addTo(map);


var railwaylayer = L.geoJSON(railway, {
    style: railwayStyle,
    onEachFeature: function (feature, layer) {
     layer.bindPopup(feature.properties.OSM_ID)
    }
})
//.addTo(map);


// adding wms layer
var landcover = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:districts',
    format: 'image/png',
    transparent: true,
    attribution: ""
})
//.addTo(map);



//basemaps control
var baseLayers = {
    "Google Satellite": googleSat,
    "OpenStreetMap": osm,
    "googleStreets": googleStreets,
    "googleTerrain": googleTerrain,
};

// overlays control
var overlays = {
    "Region": regionlayer,
    "Colleges": collegeslayer,
    "Health Facilities": healthsitelayer,
    "Railway": railwaylayer,
};

// add layer control
L.control.layers(baseLayers, overlays, {collapsed:true, sortLayers:false}).addTo(map);

// adding scale
L.control.scale({position:'bottomright'}).addTo(map)

//adding coordinates
map.on('mousemove', function(e){
    $('#coordinates').html(`Lat: ${e.latlng.lat.toFixed(3)} Lng: ${e.latlng.lng.toFixed(3)}`)
})

// add leaflet browser print control
L.control.browserPrint({position: 'topleft'}).addTo(map);

