import { TemaService } from '@/api/tema';
import { TemaContext } from '@/contexts/Tema';
import { Button, Paper } from '@mui/material';
import { LatLngExpression, Map } from 'leaflet';
import { useContext, useEffect, useRef } from 'react';
//@ts-ignore
import { MarkerLayer, Marker } from "react-leaflet-marker";
import { MapContainer, TileLayer, Popup } from 'react-leaflet'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SearchBar } from './SearchBar';
import Box from '@mui/joy/Box';
import { GeoLocationService } from '@/api/geoloc';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import MapSpeedDial from './MapSpeedDial';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function MapComponent() {
  const { isDarkTheme } = useContext(TemaContext);
  const zoom = 14;
  const { isMobile } = TemaService.useGetIsMobile();
  const { data: coordenadasAtuais } = GeoLocationService.useGetCurrentLocation();
  const mapRef = useRef<Map>();
  const position: any = [-30.03306, -51.23];
  useEffect(() => {
    console.log(coordenadasAtuais)
    if (coordenadasAtuais != undefined)
      mapRef.current?.flyTo(coordenadasAtuais, zoom)
  }, [coordenadasAtuais])
  const speedDialActions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];
  return (
    <Paper elevation={1} sx={{
      padding: '0.1px',
      position: "relative",
      // top: '15px',
      height: '100%',
      margin: '0',
      '.leaflet-control-geosearch a, \
      .leaflet-control-geosearch a:hover, \
      .leaflet-control-geosearch form': {
        background: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.primary
      },
      '.leaflet-control-geosearch form': {
        background: (theme) => theme.palette.background.default
      },
      '.leaflet-control-geosearch input, \
      .leaflet-control-geosearch .leaflet-bar-notfound, \
      .leaflet-control-geosearch .results, \
      .leaflet-control-geosearch .results > :hover': {
        background: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary
      },
      '.leaflet-control-geosearch': isMobile ? {
        width: '100%',
        maxWidth: '-webkit-fill-available',
        marginLeft: '55px',
        marginRight: '15px',
      } : {}
    }}>
      <MapSpeedDial />
      <Button
        color="warning"
        variant="contained"

        component={Link}
        to="/home/oportunidades-proximas"
        sx={{
          position: 'absolute',
          zIndex: 1190,
          top: '15dvh',
          minWidth: '10px',
          margin: '10px',
          padding: '5px'
        }}
        aria-label="add to shopping cart">
        <TrackChangesIcon />
      </Button>
      <div id="map" className={isDarkTheme ? "dark" : "light"} style={{ height: '100%' }}>
        <MapContainer
          ref={mapRef as any}
          center={coordenadasAtuais ?? position as LatLngExpression}
          zoom={zoom}
          scrollWheelZoom={true}
          style={{ height: "100%", width: '100%' }} >
          {mapRef.current && <SearchBar map={mapRef.current} />}
          <TileLayer
            detectRetina={true}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerLayer>
            <Marker position={position}
              size={[40, 40]} // mesmo que o fontSize
              placement="top">
              <LocationOnIcon sx={{ fontSize: '40px', color: isDarkTheme ? 'white' : '#000' }} />
            </Marker>
          </MarkerLayer>
        </MapContainer>
      </div>
    </Paper >
  )
}

export default MapComponent