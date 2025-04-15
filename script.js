const map = L.map('map', {
  center: [44.5, -85],
  zoom: 7,
  minZoom: 6,
  maxZoom: 18
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a> <a href="https://gis-egle.hub.arcgis.com/">EGLE Maps and Data</a>',
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

const layer1 = L.geoJSON(null, {
  onEachFeature,
  style: {
    color: '#1f77b4', // Blue for CDAs
    weight: 2,
    fillOpacity: 0.5
  }
});

const layer2 = L.geoJSON(null, {
  onEachFeature,
  style: {
    color: '#2ca02c', // Green for EAs
    weight: 2,
    fillOpacity: 0.5
  }
});

const layer3 = L.geoJSON(null, {
  onEachFeature,
  style: {
    color: '#d62728', // Red for HREAs
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

fetch('data/countriesgeojson')
  .then(response => response.json())
  .then(data => {
    // Add dimmed countries (or states, if that's intended)
    L.geoJSON(data, {
      style: {
        color: "#999",
        weight: 1,
        fillColor: "#ccc",
        fillOpacity: 0.8
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error loading countries GeoJSON:", err));  // Close first fetch properly

fetch('data/usstatesgeojson')
  .then(response => response.json())
  .then(data => {
    // Add dimmed states
    L.geoJSON(data, {
      style: {
        color: "#999",
        weight: 1,
        fillColor: "#ccc",
        fillOpacity: 0.8
      }
    }).addTo(map);

    // Filter and highlight Michigan
    const michiganOnly = {
      type: "FeatureCollection",
      features: data.features.filter(
        f => f.properties.name === "Michigan"
      )
    };

    L.geoJSON(michiganOnly, {
      style: {
        color: "#2a9d8f",
        weight: 0,
        fillColor: "#2a9d8f",
        fillOpacity: 0.0
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error loading US states GeoJSON:", err));



// Checkbox toggles
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
