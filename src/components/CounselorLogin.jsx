import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CounselorLogin() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const handleProceed = (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(code)) {
      toast.error("Please enter a valid 4-digit code.", {
        position: "top-center",
      });
      return;
    }

    localStorage.setItem("referralCode", code);

    toast.success("Redirecting...", {
      position: "top-center",
      autoClose: 600,
    });

    setTimeout(() => navigate("/pre-admission"), 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#001b48] to-[#ff4f00]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transition-transform duration-300 hover:scale-105">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#430000]">
          Welcome to Servocci Counsellors
        </h2>

        <form onSubmit={handleProceed} className="flex flex-col gap-6">
          {/* Code Input */}
          <input
            type="text"
            placeholder="Enter Counsellor Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff4f00]"
            maxLength={4}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#ff4f00] to-[#ff7f1a] hover:from-[#e63f00] hover:to-[#e66a00] text-white font-bold rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Proceed</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300 rounded-full"></div>
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CounselorLogin;
