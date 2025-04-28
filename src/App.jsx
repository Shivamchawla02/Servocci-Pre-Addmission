import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CounselorLogin from "./components/CounselorLogin.jsx";
import PreAdmissionForm from "./components/PreAddmissionForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CounselorLogin />} />
        <Route path="/pre-admission" element={<PreAdmissionForm />} />
      </Routes>
    </Router>
  );
}

export default App;
