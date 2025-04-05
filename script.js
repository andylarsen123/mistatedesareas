// Initialize the map
const map = L.map('map').setView([44.5, -85], 6); // Center on Michigan

// Add base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to add popup to each feature
function onEachFeature(feature, layer) {
  if (feature.properties) {
    const props = Object.entries(feature.properties)
      .map(([key, val]) => `<b>${key}</b>: ${val}`)
      .join('<br>');
    layer.bindPopup(props);
  }
}

// Define global layers
let layer1 = L.geoJSON(null, { onEachFeature });
let layer2 = L.geoJSON(null, { onEachFeature });
let layer3 = L.geoJSON(null, { onEachFeature });

// Load GeoJSON data
fetch('data/layer1.geojson')
  .then(res => res.json())
  .then(data => {
    layer1.addData(data);
    map.addLayer(layer1);
  });

fetch('data/layer2.geojson')
  .then(res => res.json())
  .then(data => {
    layer2.addData(data);
    map.addLayer(layer2);
  });

fetch('data/layer3.geojson')
  .then(res => res.json())
  .then(data => {
    layer3.addData(data);
    map.addLayer(layer3);
  });

// Directly attach checkbox event listeners
document.getElementById('toggleLayer1').addEventListener('change', function () {
  this.checked ? map.addLayer(layer1) : map.removeLayer(layer1);
});
document.getElementById('toggleLayer2').addEventListener('change', function () {
  this.checked ? map.addLayer(layer2) : map.removeLayer(layer2);
});
document.getElementById('toggleLayer3').addEventListener('change', function () {
  this.checked ? map.addLayer(layer3) : map.removeLayer(layer3);
});
