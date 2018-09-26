// URL TO --> EARTHQUAKE DATA FROM USGS
var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// URL TO --> TECTONIC PLATE DATA
var plateURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// GET request to the query --> QUAKE URL
d3.json(quakeURL, function(data) {
  // send the data.features object --> createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Create a GeoJSON layer containing --> the features array on --> the earthquakeData object
  // Run the --> onEachFeature function once for --> each piece of data --> in the array
  var earthquakes = L.geoJson(earthquakeData, {
    onEachFeature: function (feature, layer){
      // Define a function --> we want to run once for --> each feature in --> the features array
      // Give each feature --> a popup describing the --> place, magnitude and time of the earthquake
      layer.bindPopup("<h3>" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
    // create CIRCLES for latlng that --> reflect magnitude size -->  radius size + color
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: getRadius(feature.properties.mag),
          fillColor: getColor(feature.properties.mag),
          fillOpacity: .65,
          stroke: true,
          color: "#4c4c4c",
          weight: .75
      })
    }
  });

// Sending our earthquakes layer to --> createMap function
  createMap(earthquakes)
}
function createMap(earthquakes) {
 // Define --> Map Layers --> for Mapbox Styles
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });
  // Define a --> baseMaps object to hold --> our base layers
  var baseMaps = {
    "Lights-Out/Dark": darkmap,
    "Lights-On/Light": lightmap,
    "Street": streetmap,
    "Satellite": satellitemap,
  };
  // CREATE --> TECTONIC plates LAYER to later store, fault lines
  var tectonicline = new L.LayerGroup();

  // Create overlay object to hold --> our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    "Tectonic Plates": tectonicline
  };

  // Create --> our map,
  // earthquake, tectonicline will display when it LOADS, with the Dark Base (as default)
  var myMap = L.map("map", {
    center: [34, -118],
    zoom: 3,
    layers: [darkmap, earthquakes, tectonicline]
  });

// GET request to the query --> PLATE URL
//
   d3.json(plateURL, function(plateData) {
     // Adding our geoJSON data, along with style information, to the tectonicplates
     // layer.
     L.geoJson(plateData, {
       color: "#ff3860",
       weight: 1.25
     })
     .addTo(tectonicline);
   });

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

// LEGEND FOR COLORS + Magnitude
// UPDATE CSS STYLE FOR BACKGROUND COLOR OF LEGEND
var legend = L.control({position: 'topleft'});

legend.onAdd = function (myMap) {

  var div = L.DomUtil.create('div', 'info legend'),
            categories = [0, 1, 2, 3, 4, 5, 6, 7, 8],
            labels = [];

  for (var i = 0; i < categories.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(categories[i] + 1) + '"></i> ' +
          categories[i] + (categories[i + 1] ? '&ndash;' + categories[i + 1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(myMap);
}

// getCOLOR function for LINE 26 and 122
// make colors match EARTHQUAKE SCALE
function getColor(d) {
  return d > 8 ? '#b30000' :
  d > 7 ? '#ff0000' :
  d > 6 ? '#f9b616' :
  d > 5 ? '#f4ee56' :
  d > 4  ? '#7afd96' :
  d > 3  ? '#93f7ff' :
  d > 2  ? '#b6a3e5' :
  d > 1   ? '#d7d1ff' :
            '#ffffff';
}

// getRadius function for LINE 27
function getRadius(value){
  return value*30000
}
