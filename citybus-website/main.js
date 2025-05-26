import './style.css';
import { Map, View } from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { getDistance } from 'ol/sphere';

const centerCoordinates = fromLonLat([9.76727, 50.67966]);
const getGPSEndpoint = "https://setaply.app.n8n.cloud/webhook/94bd2ffe-5099-4477-b813-c88b3e6b5579";
//http://217.154.87.99:3000/get-gps

// Bus marker
const busMarker = new Feature({
  geometry: new Point(fromLonLat([0, 0]))
});
busMarker.setStyle(
  new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: "./images/marker.png"  // Bus marker image
    })
  })
);

// User marker
const userMarker = new Feature({
  geometry: new Point(fromLonLat([0, 0]))  // Default initial position same as center
});
userMarker.setStyle(
  new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: "./images/user-marker.png",  // Your own user marker image (e.g. a dot or person icon)
      scale: 0.6  // Optionally smaller
    })
  })
);

const vectorSource = new VectorSource({
  features: [busMarker, userMarker]  // Add both markers here
});

const markerLayer = new VectorLayer({
  source: vectorSource
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    markerLayer
  ],
  view: new View({
    center: centerCoordinates,
    zoom: 15
  })
});

async function getGPSData() {
  try {
    const response = await fetch(getGPSEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null; 
  }
}

function wait(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

const changeBusPos = (long, lat) => {
  const newLonLat = fromLonLat([long, lat]);
  busMarker.setGeometry(new Point(newLonLat));
}

const updateUserPos = () => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition((position) => {
    const userLonLat = fromLonLat([position.coords.longitude, position.coords.latitude]);
    userMarker.setGeometry(new Point(userLonLat));
  });
}

const cyclePos = async () => {
  let gpsData = await getGPSData();
  if (gpsData) {
    changeBusPos(gpsData.longitude, gpsData.latitude);
    updateNearestBusDistance();
  }
  updateUserPos();  // Update user marker on every cycle too
  await wait(10);
  cyclePos();
}

function startWatchingUserPosition() {
  if (!navigator.geolocation) {
    console.warn('Geolocation not supported by your browser');
    return;
  }

  navigator.geolocation.watchPosition((position) => {
    const userLonLat = fromLonLat([position.coords.longitude, position.coords.latitude]);
    userMarker.setGeometry(new Point(userLonLat));
  }, (error) => {
    console.error('Error watching position:', error);
  }, {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 5000
  });
}

function updateNearestBusDistance() {
  const label = document.getElementById('nearestBus');
  if (!label) return;

  if (!navigator.geolocation) {
    label.textContent = "Geolocation not supported by your browser";
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const phoneCoords = [position.coords.longitude, position.coords.latitude];
    const busCoords = toLonLat(busMarker.getGeometry().getCoordinates());

    // Calculate distance in meters
    const distance = getDistance(phoneCoords, busCoords);
    console.log(distance)

    label.textContent = `${distance.toFixed(1)} meters`;
  }, (error) => {
    label.textContent = "Unable to get your location";
    console.error(error);
  });
}

startWatchingUserPosition();
cyclePos();
setInterval(updateNearestBusDistance, 1000);
