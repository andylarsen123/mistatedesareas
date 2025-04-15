const map = L.map('map', {
  center: [44.5, -85],
  zoom: 7,
  minZoom: 6,
  maxZoom: 18
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>',
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

// Add unique styles for each layer
const layer1 = L.geoJSON(null, {
  onEachFeature,
  style: {
    color: '#1f77b4', // blue
    weight: 2,
    fillOpacity: 0.5
  }
});

const layer2 = L.geoJSON(null, {
  onEachFeature,
  style: {
    color: '#ff7f0e', // orange
    weight: 2,
    fillOpacity: 0.5
  }
});

const layer3 = L.geoJSON(null, {
  onEachFeature,
  style: {
    color: '#2ca02c', // green
    weight: 2,
    fillOpacity: 0.5
  }
});

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

  const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'info legend');
  const layers = [
    { name: 'Layer 1', color: '#1f77b4' },
    { name: 'Layer 2', color: '#ff7f0e' },
    { name: 'Layer 3', color: '#2ca02c' }
  ];

  div.innerHTML = layers
    .map(layer => `
      <i style="background:${layer.color}; width:18px; height:18px; float:left; margin-right:8px; opacity:0.7;"></i>
      ${layer.name}<br>
    `)
    .join('');

  return div;
};

legend.addTo(map);

});
