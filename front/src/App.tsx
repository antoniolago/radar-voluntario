import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
// import GlobalStyles from './styles/GlobalStyles';
// import ReactGA from 'react-ga4';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import { Tema } from './contexts/Tema';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';

  const queryClient = new QueryClient();
function App() {
  // const { error } = useGetProfile();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Tema>
          <Routes>
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </Tema >
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
export default App;