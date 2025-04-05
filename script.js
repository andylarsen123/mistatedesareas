// Initialize the map
const map = L.map('map').setView([44.5, -85], 6); // Adjust to your region

// Add base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Popup display logic
function onEachFeature(feature, layer) {
  if (feature.properties) {
    const props = Object.entries(feature.properties)
      .map(([key, val]) => `<b>${key}</b>: ${val}`)
      .join('<br>');
    layer.bindPopup(props);
  }
}

// Create empty layers
const layer1 = L.geoJSON(null, { onEachFeature });
const layer2 = L.geoJSON(null, { onEachFeature });
const layer3 = L.geoJSON(null, { onEachFeature });

// Load GeoJSON files
fetch('data/layer1.geojson')
  .then(res => res.json())
  .then(data => layer1.addData(data));
fetch('data/layer2.geojson')
  .then(res => res.json())
  .then(data => layer2.addData(data));
fetch('data/layer3.geojson')
  .then(res => res.json())
  .then(data => layer3.addData(data));

// Add layers to map by default (optional)
layer1.addTo(map);
layer2.addTo(map);
layer3.addTo(map);

// Add layer toggle control
const overlays = {
  "Layer 1": layer1,
  "Layer 2": layer2,
  "Layer 3": layer3
};
L.control.layers(null, overlays).addTo(map);

