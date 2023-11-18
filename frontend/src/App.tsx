import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
// import ReactGA from 'react-ga4';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import { Tema } from './contexts/Tema';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet-geosearch/dist/geosearch.css';
// import LoginModal from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGetAppSettings } from './api/appsettings';
import ProfileEdit from './pages/ProfileEdit';
import Opportunities from './pages/Opportunities';
import OpportunityDetails from './pages/OpportunityDetails';
import InstitutionDetails from './pages/InstitutionDetails';
import VolunteerDetails from './pages/VolunteerDetails';
import Volunteers from './pages/Volunteers';
import Registrations from './pages/Registrations';
import Institutions from './pages/Institutions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/en-gb';
import VolunteersOpportunity from './pages/VolunteersOpportunity';

function App() {
  return (
    <Router>
      <Tema>
      <LocalizationProvider dateAdapter={AdapterDayjs}
      localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
      adapterLocale='en-gb'>

        <Routes>
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/login" element={<><Home /><LoginModal /></>} /> */}
            <Route path="/perfilInstituicao" element={<ProfileEdit profile={'institution'}/>} />
            <Route path="/perfil" element={<ProfileEdit profile={'volunteer'}/>} />
            <Route path="/oportunidades" element={<Opportunities/>} />
            <Route path="/voluntario/:id" element={<VolunteerDetails/>} />
            <Route path="/voluntarios" element={<Volunteers/>} />
            <Route path="/inscricoes" element={<Registrations/>} />
            <Route path="/organizacoes" element={<Institutions/>} />
            <Route path="/organizacao/:id" element={<InstitutionDetails/>} />
            <Route path="/organizacao/:id/edit" element={<ProfileEdit profile={'institution'}/>} />
            <Route path="/organizacao/:idInstitution/oportunidade/:idOpportunity" element={<OpportunityDetails/>} />
            <Route path="/organizacao/:idInstitution/oportunidade/:idOpportunity/voluntarios" element={<VolunteersOpportunity/>} />
          </Route>
        </Routes>
        </LocalizationProvider>
      </Tema >
    </Router>
  );
}
export default App;