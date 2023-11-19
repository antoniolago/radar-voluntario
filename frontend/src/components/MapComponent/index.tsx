import { TemaService } from '@/api/tema';
import { TemaContext } from '@/contexts/Tema';
import { Button, Paper } from '@mui/material';
import L, { LatLngExpression, Map } from 'leaflet';
import { useContext, useEffect, useRef, useState } from 'react';
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
import { Link, matchRoutes, useLocation } from 'react-router-dom';
import ReactDOMServer, { renderToStaticMarkup } from "react-dom/server";
import { Coordenates } from '@/types/coords';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import { OpportunityService } from '@/api/opportunity';
import { Opportunity } from '@/types/opportunity';
import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import OpportunityDetails from '@/pages/OpportunityDetails';

interface MapProps {
  selectionMode?: boolean;
  position?: LatLngExpression | undefined;
  setSelectedCoordenate?: any;
  previewMode?: boolean;
  isHome?: boolean
}
function MapComponent(props: MapProps) {
  const [ selectedOpportunity, setSelectedOpportunity ] = useState<Opportunity | undefined>();
  const { mode } = useMaterialColorScheme();
  const [selectionPinRef, setSelectionPinRef] = useState<Marker<any>>();
  const zoom = 14;
  const { isMobile } = TemaService.useGetIsMobile();
  const { data: opportunities, isLoading: isLoadingOpportunities } = OpportunityService.useGetOpportunityList();
  const { data: coordenadasAtuais } = GeoLocationService.useGetCurrentLocation();
  const mapRef = useRef<Map>();
  const markerRef = useRef<Marker>();
  const position: any = [-30.03306, -51.23];
  const location = useLocation()
  const route = matchRoutes([{path: "/"}], location)
  var isHome = route != undefined ? route[0].route.path == "/" : false;
  console.log(isHome)
  const MarkerIcon = <LocationOnIcon
    sx={{
      fontSize: '40px',
      "path": {
        stroke: 'red',
        fill: 'darkred'
      }
    }}
  />
  useEffect(() => {
    if (opportunities != undefined && mapRef?.current != undefined) {
      opportunities.forEach((opp: Opportunity) => {
        if (opp.address != undefined && opp.published && isHome) {
          var pinRef = createPin({ lat: opp.address.latitude, lng: opp.address.longitude } as LatLngExpression);
          pinRef.on("click", function (ev: any) {
            setSelectedOpportunity(opp)
          });
        }
      })
    }
  }, [opportunities, mapRef.current])
  const createPin = (position: LatLngExpression) => {
    var pinRef = L.marker(position, {
      riseOnHover: true, draggable: false,
      icon: L.divIcon(
        {
          html: renderToStaticMarkup(MarkerIcon) as any,
          className: 'custom-marker',
          iconSize: [40, 40]
        }
      ),
    })
    pinRef.addTo(mapRef?.current as any);
    return pinRef;
  }
  useEffect(() => {
    if (props.previewMode && props.position != undefined &&
      mapRef?.current != undefined) {
      createPin(props.position);
    }
  }, [mapRef?.current, props.position, props.previewMode])
  useEffect(() => {
    if (props.selectionMode &&
      markerRef?.current != undefined) {
      // if (selectionPinRef?.current == undefined) {
      mapRef.current?.on('click', function (ev) {
        var t = L.marker(ev.latlng, {
          riseOnHover: true, draggable: true,
          icon: L.divIcon({ html: renderToStaticMarkup(MarkerIcon) as any, className: 'custom-marker', iconSize: [40, 40] }),
        })
        t.addTo(mapRef?.current as any);
        t?.on('drag', function (ev: any) {
          props.setSelectedCoordenate({
            latitude: ev.latlng.lat,
            longitude: ev.latlng.lng
          } as Coordenates)
        });
        setSelectionPinRef(t);
        mapRef.current?.removeEventListener('click');
        mapRef.current?.on('click', function (ev) {
          t?.setLatLng(ev.latlng);
          props.setSelectedCoordenate({
            latitude: ev.latlng.lat,
            longitude: ev.latlng.lng
          } as Coordenates)
        });
      });
      // } else {
      //   mapRef.current?.on('click', function (ev) {
      //     console.log(selectionPinRef)
      //     selectionPinRef?.current?.setLatLng(ev.latlng);
      //     setSelectedLatitude(ev.latlng.lat);
      //     setSelectedLongitude(ev.latlng.lng);
      //   });
      // }
    }
  }, [markerRef?.current, selectionPinRef?.current])
  useEffect(() => {
    if (coordenadasAtuais != undefined && mapRef?.current != undefined)
      mapRef.current?.flyTo(coordenadasAtuais, zoom)
  }, [coordenadasAtuais, mapRef.current])
  useEffect(() => {
    if (props.position != undefined && mapRef?.current)
      mapRef.current?.flyTo(props.position, 16)
  }, [props.position, props.previewMode, mapRef?.current])

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
      } : {},
      ".custom-marker": {
        fill: 'darkred',
        stroke: mode == "dark" ? 'white' : "black"
      }
    }}>
      {/* {!props.selectionMode && <MapSpeedDial />} */}
      {/* <Button
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
      </Button> */}
      <div id="map" className={mode} style={{ height: '100%' }}>
        <MapContainer
          ref={mapRef as any}
          center={coordenadasAtuais ?? position as LatLngExpression}
          zoom={zoom}
          maxZoom={20}
          scrollWheelZoom={true}
          style={{ height: "100%", width: '100%' }} >
          {mapRef.current && !props.selectionMode && !props.previewMode &&
            <SearchBar map={mapRef.current} />
          }
          <TileLayer
            maxNativeZoom={20}
            maxZoom={40}
            detectRetina={true}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerLayer>
            <Marker innerRef={markerRef as any} position={position} id="mainMarker"
              size={[40, 40]} // mesmo que o fontSize
              placement="top">
              {/* <LocationOnIcon sx={{ fontSize: '40px', color: isDarkTheme ? 'white' : '#000' }} /> */}
            </Marker>
          </MarkerLayer>
        </MapContainer>
      </div>

      <Modal
        open={selectedOpportunity != undefined}
        onClose={() => setSelectedOpportunity(undefined)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalDialog sx={{ overflowY: 'auto' }}>
          <ModalClose />
          <Typography>Oportunidade </Typography>
          <OpportunityDetails id={selectedOpportunity?.id}/>
        </ModalDialog>
      </Modal>
    </Paper >
  )
}

export default MapComponent