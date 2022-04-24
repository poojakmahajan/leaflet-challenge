// Store our API endpoint as queryUrl.
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
    console.log(data.features)
  });

  function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    //layers: [street, earthquakes]
  });

   // Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
//L.control.layers(baseMaps, overlayMaps, {
  //collapsed: false
//}).addTo(myMap);
    // Send our earthquakes layer to the createMap function/
    //createMap(earthquakes);
  //}
  // Create the map object
  //var myMap = L.map("map", {
    //center: [34.0522, -118.2437],
    //zoom: 5
//});



// Depth function
function getFillColor(depth) {
    if (depth >= 90) {
        return '#f50000'
    } else {
        if (depth > 70) {
            return '#ff5c5c'
        }
        else {
            if (depth > 50) {
                return '#ffbb3d'
            }
            else {
                if (depth > 30) {
                    return '#6e9393'
                } else {
                    if (depth > 10) {
                        return '#d1e231'
                    } else {
                        if (depth < 10) {
                            return '#00ff00'
                        } else {
                                return '#78866b'
                                    }
                                }
                            }
                        }
                    }
                }
            };


// Get Data
d3.json(queryUrl).then(function (data) {
    //console.log(data);
    L.geoJSON(data, {
        onEachFeature: onEachFeature,
        // Create circle marker
        pointToLayer: function (feature, latlng) {
            console.log('Creatin marker');
            return new L.CircleMarker(latlng, {
                // Define circle radius
                radius: feature.properties.mag * 5,
                fillColor: getFillColor(feature.geometry.coordinates[2]),
                fillOpacity: 1,
                weight: 0.1
            }).addTo(myMap);
        }
    });
});

// Adding the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)
//}

// Legend
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var depth = [-10, 30, 50, 70, 90];
    var colors = ['#f50000', '#ff5c5c', '#ffbb3d', '#6e9393', '#00ff00']
    var labels = []
legend.addTo(myMap)
  }
}