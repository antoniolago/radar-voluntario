import { LatLngExpression } from 'leaflet';
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  const position: any = [-30.03306, -51.23];
  return (
    <div id="map">
      <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={false}>
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

export default App
