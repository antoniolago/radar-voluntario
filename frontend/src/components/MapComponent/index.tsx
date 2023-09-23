import { LatLngExpression, Map } from 'leaflet';
import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function MapComponent() {
  const mapRef = useRef<Map>();
  const position: any = [-30.03306, -51.23];
  return (
    <div id="map">
      <MapContainer ref={mapRef as any} center={position as LatLngExpression} zoom={14} scrollWheelZoom={true} style={{ height: "80vh" }} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popusp. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapComponent
