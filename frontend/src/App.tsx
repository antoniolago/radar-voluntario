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
import OpportunityEdit from './pages/OpportunityEdit';
import OpportunityDetails from './pages/OpportunityDetails';
import InstitutionDetails from './pages/InstitutionDetails';
import VolunteerDetails from './pages/VolunteerDetails';
import Volunteers from './pages/Volunteers';
import Registrations from './pages/Registrations';
import Institutions from './pages/Institutions';

function App() {
  return (
    <Router>
      <Tema>
        <Routes>
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/login" element={<><Home /><LoginModal /></>} /> */}
            <Route path="/perfilInstituicao" element={<ProfileEdit profile={'institution'}/>} />
            <Route path="/perfil" element={<ProfileEdit profile={'volunteer'}/>} />
            <Route path="/oportunidades" element={<Opportunities/>} />
            <Route path="/edicao/oportunidade/:id?" element={<OpportunityEdit/>} />
            <Route path="/oportunidade/:id" element={<OpportunityDetails/>} />
            <Route path="/instituicao/:id" element={<InstitutionDetails/>} />
            <Route path="/voluntario/:id" element={<VolunteerDetails/>} />
            <Route path="/voluntarios" element={<Volunteers/>} />
            <Route path="/inscricoes" element={<Registrations/>} />
            <Route path="/organizacoes" element={<Institutions/>} />
          </Route>
        </Routes>
      </Tema >
    </Router>
  );
}
export default App;