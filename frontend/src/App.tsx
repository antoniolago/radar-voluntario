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
import LoginModal from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGetAppSettings } from './api/appsettings';

function App() {
  // const { error } = useGetProfile();
  const { data: appSettings } = useGetAppSettings();

  return (
    // appSettings?.GOOGLE_OAUTH_CLIENT_ID &&
    <GoogleOAuthProvider clientId={appSettings?.GOOGLE_OAUTH_CLIENT_ID || ""}>
      <Router>
        <Tema>
          <Routes>
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<><Home /><LoginModal /></>} />
            </Route>
          </Routes>
        </Tema >
      </Router>
    </GoogleOAuthProvider>
  );
}
export default App;