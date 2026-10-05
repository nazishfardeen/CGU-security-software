import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Visitors from './pages/Visitors';
import Incidents from './pages/Incidents';
import LostAndFound from './pages/LostAndFound';
import StudentLeaves from './pages/StudentLeaves';
import Emergency from './pages/Emergency';
import GuardShifts from './pages/GuardShifts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="visitors" element={<Visitors />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="lost-found" element={<LostAndFound />} />
          <Route path="student-leaves" element={<StudentLeaves />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="guard-shifts" element={<GuardShifts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
