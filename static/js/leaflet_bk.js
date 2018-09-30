var URL = "https://data.lacity.org/resource/k8cc-2d49.geojson"

// Perform a GET request to the query URL
d3.json(URL, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

var heatArray = []

function createFeatures(collisionData) {
console.log(collisionData);
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h1>" + "<h1>This collision is in the " + feature.properties.area_name + " area.</h1>"
    + "<h3> Street: " + feature.properties.location + "</h3>"
    + "<h3> Cross Street: " + feature.properties.cross_street + "</h3>"
    + "<h3> Time Occured: " + feature.properties.time_occ + "</h3>"
    + "<h3> Description of Incident: " + feature.properties.premis_desc + "</h3>"
    + "<h3> Coordinates: " + feature.geometry.coordinates)
    heatArray.push([feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
  }

console.log("this is after data has been pushed to the heatArray");
console.log(heatArray);
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var collisions = L.geoJSON(collisionData, {
    onEachFeature: onEachFeature
  });

  // Sending our layer to the createMap function
  createMap(collisions);
}

function createMap(collisions) {
  // Define streetmap and darkmap layers
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
  // var heat = L.heatLayer(heatArray, { radius: 35 });
  var heat = L.heatLayer(heatArray,
    {radius: 90,
    blur: 1.5,
    opacity: .6}
  )
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Collisions": collisions,
    "Heatmap":heat,
    // "Heatmap": heat
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      34.052, -118.243
    ],
    zoom: 13,
    layers: [streetmap,collisions,heat]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)}
  //
  // heat.addTo(myMap);



//
