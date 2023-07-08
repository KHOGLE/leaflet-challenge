
let myMap = L.map("map", {
    center: [40.76, -111.89],
    zoom: 5,
    layers: []
});

var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);

let geoData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(geoData).then(function(data){
   //getFeatures(data.features);
    
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
    
    function getFeatures(feature){
        // let markers = {
            return {
            radius: magnitude(feature.properties.mag),
            fillColor: quakeColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            color: 'dimgrey',
            weight: 0.4}
        // }
    //     for (let i =0; i <earthquakes.length; i++) {
    //         let lat = earthquakes[i].feature.geometry.coordinates[1];
    //         let lng = earthquakes[i].feature.geometry.coordinates[0]
    //         // markers.addLayer(L.cirle([lat,lng]))
    //         L.circle()
        
    }
    L.geoJson(data,{
        pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng);
        },
        style: getFeatures,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Where: " + feature.properties.place + 
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + 
            "<br><h2> Magnitude: " + feature.properties.mag + "</h2>");
        }
    }).addTo(myMap)
    
        // onEachFeature: function(feature, layer) {
        //     layer.on({
        //         mouseover:function(event){
        //             layer = event.target;
        //             layer.setStyle({
        //                 fillOpacity:0.9
        //             });
        //         },
        //         mouseout: function(event){
        //             layer = event.target;
        //             layer.setStyle({
        //                 fillOpacity:0.5
        //             });
        //         },
        //         click: function(event) {
        //             layer.bindPopup("<h3> Where: " + feature.properties.place + 
        //             "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + 
        //             "<br><h2> Magnitude: " + feature.properties.mag + "</h2>");
        //         }
    
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


});







 

