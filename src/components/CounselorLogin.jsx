import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CounselorLogin() {
  const [referralCode, setReferralCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (referralCode === "ABC123") {
      toast.success("Referral Code Verified! Redirecting...", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => navigate("/pre-admission"), 1600); // wait a bit for toast
    } else {
      toast.error("Invalid Referral Code", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#001b48] to-[#ff4f00]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#430000]">
          Servocci Counsellors
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="Enter Referral Code"
            className="w-full px-4 py-3 border-2 border-[#2c6975] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2c6975] shadow-sm transition"
            required
          />

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
