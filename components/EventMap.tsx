import { useEffect } from 'react'; // Add this import
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import icpLogo from '@/app/icplogo.png'; // Import the ICP logo
import { LatLngTuple } from 'leaflet';

export default function EventMap() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      L.Icon.Default.mergeOptions({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
      });
    }
  }, []);

  const icpMarkerIcon = new L.Icon({
    iconUrl: icpLogo.src,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const eventLocations: { name: string; position: LatLngTuple }[] = [
    {
      name: "Hackathon Medellín - Marzo 2024",
      position: [6.2442, -75.5812],
    },
    {
      name: "NASA Apps Challenge - Chía, Octubre 2024",
      position: [4.8581, -74.0573],
    },
    {
      name: "Presentación Gabbii - Cali, Octubre 2024",
      position: [3.4516, -76.5319],
    },
  ];

  return (
    <div className="w-full h-48 md:h-64 rounded-lg shadow-lg overflow-hidden">
      <MapContainer center={[4.5709, -74.2973]} zoom={6} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {eventLocations.map((event, index) => (
          <Marker key={index} position={event.position} icon={icpMarkerIcon}>
            <Popup>{event.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
