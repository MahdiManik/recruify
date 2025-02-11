import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="schedule" element={<CreateInterview />} />
        <Route path="edit/:id" element={<EditInterview />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
