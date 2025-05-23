import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CounselorLogin from "./components/CounselorLogin.jsx";
import PreAdmissionForm from "./components/PreAddmissionForm.jsx";
import ThankYouPage from "./components/ThankYouPage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CounselorLogin />} />
        <Route path="/pre-admission" element={<PreAdmissionForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
