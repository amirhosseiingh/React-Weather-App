import { Route, Routes } from 'react-router';
import UserAuth from './pages/UserAuth';
import Home from './pages/Home';
import WeatherSearch from './pages/WeatherSearch';
// import Dashboard from './pages/Dashboard';
// import Weather from './pages/Weather';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<UserAuth />} />
      <Route path="/weather-search" element={<WeatherSearch />} />
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/weather" element={<Weather />} /> */}
    </Routes>
  );
};

export default App;
