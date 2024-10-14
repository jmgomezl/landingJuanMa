// Importaciones necesarias
import { useEffect } from 'react'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import icpLogo from '@/app/icplogo.png'; // Asegúrate de que esta ruta sea correcta

export default function EventMap() {
  // Uso de useEffect para modificar los iconos de Leaflet solo en el navegador
  useEffect(() => {
    if (typeof window !== 'undefined') {
      L.Icon.Default.mergeOptions({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],   // Tamaño del ícono del marcador
        iconAnchor: [12, 41], // Ancla del marcador
        shadowSize: [41, 41], // Tamaño de la sombra
      });
    }
  }, []);

  // Definir el ícono personalizado con el logo de ICP
  const icpMarkerIcon = new L.Icon({
    iconUrl: icpLogo.src,
    iconSize: [32, 32],       // Tamaño del ícono personalizado
    iconAnchor: [16, 32],     // Ancla del ícono personalizado
    popupAnchor: [0, -32],    // Posición del popup relativo al ícono
  });

  // Lista de ubicaciones de eventos con nombre y posición
  const eventLocations: { name: string; position: LatLngTuple }[] = [
    {
      name: 'Hackathon Medellín - Marzo 2024',
      position: [6.2442, -75.5812], // Coordenadas de Medellín
    },
    {
      name: 'NASA Apps Challenge - Chía, Octubre 2024',
      position: [4.8581, -74.0573], // Coordenadas de Chía
    },
    {
      name: 'Presentación Gabbii - Cali, Octubre 2024',
      position: [3.4516, -76.5319], // Coordenadas de Cali
    },
  ];

  // Renderizar el mapa con los marcadores
  return (
    <div className="w-full h-48 md:h-64 rounded-lg shadow-lg overflow-hidden">
      <MapContainer center={[4.5709, -74.2973]} zoom={6} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Renderizar marcadores para cada ubicación de evento */}
        {eventLocations.map((event, index) => (
          <Marker key={index} position={event.position} icon={icpMarkerIcon}>
            <Popup>{event.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
