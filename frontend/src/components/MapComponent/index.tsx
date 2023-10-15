import { TemaService } from '@/api/tema';
import { TemaContext } from '@/contexts/Tema';
import { Paper } from '@mui/material';
import { Control, DivIcon, Icon, LatLngExpression, Map, Point } from 'leaflet';
import { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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
          <Marker position={position}
            // icon={
            //   new Icon({
            //     iconSize: new Point(40, 40),
            //     iconUrl: 'https://www.cleesp.ufscar.br/imagens/marker.png/image'
            //   })
            // }
          >
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
