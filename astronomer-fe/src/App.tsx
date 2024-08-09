import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Employee from "./pages/Employee/Employee";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/employee" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
