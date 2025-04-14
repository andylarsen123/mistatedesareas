const map = L.map('map').setView([44.5, -85], 6);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

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

// Load and add data
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

// Toggle checkboxes
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

const bounds = [
  [41.5, -90], // Southwest corner (approx)
  [48.5, -82]  // Northeast corner (approx)
];

const map = L.map('map', {
  center: [44.5, -85],
  zoom: 6,
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
  minZoom: 6,
  maxZoom: 10
});

});
