import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayout from "./Layout/MainLayout";
import ScheduleInterview from "./components/ScheduleInterview";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="schedule" element={<ScheduleInterview />} />
        {/* <Route path="edit/:id" element={<EditInterview />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
