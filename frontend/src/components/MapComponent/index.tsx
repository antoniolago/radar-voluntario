import { TemaService } from '@/api/tema';
import { TemaContext } from '@/contexts/Tema';
import { Paper } from '@mui/material';
import { Control, DivIcon, Icon, LatLngExpression, Map, Point } from 'leaflet';
import { useContext, useEffect, useRef } from 'react';
import { MarkerLayer, Marker } from "react-leaflet-marker";
import { MapContainer, TileLayer, Popup } from 'react-leaflet'
import LocationOnIcon from '@mui/icons-material/LocationOn';

function MapComponent() {
  const { isDarkTheme } = useContext(TemaContext);
  const { isMobile } = TemaService.useGetIsMobile();
  const mapRef = useRef<Map>();
  const position: any = [-30.03306, -51.23];
  return (
    <Paper elevation={1} sx={{
      padding: '0.1px',
      position: "relative",
      // top: '15px',
      height: '100%',
      margin: '0',
    }}>
      <div id="map" className={isDarkTheme ? "dark" : "light"} style={{ height: '100%' }}>
        <MapContainer
          ref={mapRef as any}
          center={position as LatLngExpression}
          zoom={17}
          scrollWheelZoom={true}
          style={{ height: "100%", width: '100%' }} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerLayer>
            <Marker position={position}
              size={[40, 40]} // mesmo que o fontSize
              placement="top">
              <LocationOnIcon sx={{fontSize: '40px', color: isDarkTheme ? 'white' : '#000'}}/>
            </Marker>
          </MarkerLayer>
        </MapContainer>
      </div>
    </Paper>
  )
}

export default MapComponent
