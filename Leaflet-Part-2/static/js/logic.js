function createMap (quakes, tPlates){
    let myMap = L.map("map", {
        center: [40.76, -111.89],
        zoom: 5,
        layers: []
    });
    //Greyscale tilelayer
    var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    
    //Satellite tilelayer
    var USGS_USImagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    });
    
    //Outdoor tilelayer
    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16
    });
    // var USGS_USTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
    // 	maxZoom: 20,
    // 	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    // });
    
    let baseMaps = {
        "Satellite" : Stadia_AlidadeSmooth,
        "Grayscale": USGS_USImagery,
        "Outdoors": Esri_NatGeoWorldMap
    };
    
    let overlayMaps = {
        "Techtonic Plates": tectPlates,
        "Earthquakes": earthquakes
    }
    
    L.control.layers(baseMaps, overlayMaps, {collaSpsed: false}).addTo(myMap)

}

function earthquakes(earthquake){
let geoData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(geoData).then(function(data){
    function quakeColor(depth){
        if (depth < 10) return '#66ff00';
        else if (depth < 30) return '#bfff00';
        else if (depth < 50) return '#ffff00';
        else if (depth < 70) return '#ffd000';
        else if (depth < 90) return '#ff9d00';
        else return '#ff5500';
    }

    function magnitude(mag){
        return mag * 6
    }
    
    function markerStyle(feature){
        return {
            radius: magnitude(feature.properties.mag),
            fillColor: quakeColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            color: 'dimgrey',
            weight: 0.4}
    }

    let quakes = L.geoJson(data,{
        pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng);
        },
        style: markerStyle,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Where: " + feature.properties.place + 
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + 
            "<br><h2> Magnitude: " + feature.properties.mag + "</h2>");
        }
    }).addTo(myMap)

    let legend = L.control({position: "bottomright"});

    legend.onAdd = function(map){
        let div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Depth of Earthquakes</h4>";
        div.innerHTML += '<i style="background:#66ff00"></i><span>-10 - 10</span><br>';
        div.innerHTML += '<i style="background:#bfff00"></i><span>10 - 30</span><br>';
        div.innerHTML += '<i style="background:#ffff00"></i><span>30 - 50</span><br>';
        div.innerHTML += '<i style="background:#ffd000"></i><span>50 - 700</span><br>';
        div.innerHTML += '<i style="background:#ff9d00"></i><span>70 - 90</span><br>';
        div.innerHTML += '<i style="background:#ff5500"></i><span>90+</span><br>';
        return div;
    };
    
    legend.addTo(myMap);

    createMap(quakes);
});
};

function tectPlates(plates){
let tectonicPlates = 'https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json'

d3.json(tectonicPlates).then(function(data){
    
    let tPlates = L.geoJson(plates, {
        color: "gold",
        weight: 4
    }).addTo(myMap);

    createMap(tPlates);
});
};
