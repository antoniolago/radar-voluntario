import { LatLngExpression } from 'leaflet';
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  const position: number[] = [-30.01 -51.13];
  return (
    <div id="map">
      <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position as LatLngExpression}>
          <Popup>
            A pretty CSS3 popusp. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default App
