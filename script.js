const map = L.map('map').setView([44.5, -85], 7);

// Add a grey world basemap using Stamen Toner (light style)
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under ODbL.',
  maxZoom: 18
}).addTo(map);

// Define Michigan's boundary (GeoJSON format or draw as polygon)
const michiganBoundary = {
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-90, 41.5], [-82, 41.5], [-82, 48.5], [-90, 48.5], [-90, 41.5]
    ]]
  }
};

// Create a layer for Michigan with a different color (highlighted)
L.geoJSON(michiganBoundary, {
  style: {
    color: '#00b3b3', // Highlight Michigan with a cyan color
    weight: 2,
    fillOpacity: 0.5
  }
}).addTo(map);

// Existing layer setup
const onEachFeature = (feature, layer) => {
  if (feature.properties) {
    const props = Object.entries(feature.properties)
      .map(([key, val]) => `<b>${key}</b>: ${val}`)
      .join('<br>');
    layer.bindPopup(props);
  }
};

const layer1 = L.geoJSON(null, { onEachFeature });
const layer2 = L.geoJSON(null, { onEachFeature });
const layer3 = L.geoJSON(null, { onEachFeature });

// Load and add data for each layer
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

// Toggle checkboxes to show/hide layers
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('toggleLayer1').addEventListener('change', function () {
    this.checked ? map.addLayer(layer1) : map.removeLayer(layer1);
  });

  document.getElementById('toggleLayer2').addEventListener('change', function () {
    this.checked ? map.addLayer(layer2) : map.removeLayer(layer2);
  });

  document.getElementById('toggleLayer3').addEventListener('change', function () {
    this.checked ? map.addLayer(layer3) : map.removeLayer(layer3);
  });
});
