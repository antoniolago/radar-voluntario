import { TemaContext } from '@/contexts/Tema';
import { Paper } from '@mui/material';
import { Control, LatLngExpression, Map } from 'leaflet';
import { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function MapComponent() {
  const { isDarkTheme } = useContext(TemaContext);
  const mapRef = useRef<Map>();
  const position: any = [-30.03306, -51.23];
  return (
    <Paper elevation={1} sx={{
      padding: 1,
      position: "relative",
      // top: '15px',
      height: '100%',
      margin: '10px'
    }}>
      <div id="map" className={isDarkTheme ? "dark" : "light"} style={{height: '100%'}}>
        <MapContainer
          ref={mapRef as any}
          center={position as LatLngExpression}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: "100%", width: '100%' }} >
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
    </Paper>
  )
}

export default MapComponent
