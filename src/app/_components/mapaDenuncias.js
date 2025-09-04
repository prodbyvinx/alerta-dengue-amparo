'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({ iconUrl: "/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] });

export default function MapaDenuncias({ denuncias }) {
  const position = [-22.5694, -46.7786];

  return (
    <MapContainer center={position} zoom={14} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {denuncias.map(d => (
        <Marker key={d.id} position={[d.latitude, d.longitude]} icon={icon}>
          <Popup>
            <b>Status:</b> {d.status} <br />
            {d.descricao && `Descrição: ${d.descricao}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}