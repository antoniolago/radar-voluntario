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
import './App.css';
import ProfileEdit from './pages/ProfileEdit';
import Opportunities from './pages/Opportunities';
import OpportunityEdit from './pages/OpportunityEdit';

function App() {
  return (
    <Router>
      <Tema>
        <Routes>
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/login" element={<><Home /><LoginModal /></>} /> */}
            <Route path="/perfilInstituicao" element={<ProfileEdit profile={'institution'}/>} />
            <Route path="/perfilVoluntario" element={<ProfileEdit profile={'volunteer'}/>} />
            <Route path="/oportunidades" element={<Opportunities/>} />
            <Route path="/oportunidade/:id?" element={<OpportunityEdit/>} />
            
          </Route>
        </Routes>
      </Tema >
    </Router>
  );
}
export default App;