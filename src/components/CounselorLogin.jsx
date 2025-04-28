import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CounselorLogin() {
  const navigate = useNavigate();

  const handleProceed = (e) => {
    e.preventDefault();
    toast.success("Redirecting...", {
      position: "top-center",
      autoClose: 1000,
    });
    setTimeout(() => navigate("/pre-admission"), 1100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#001b48] to-[#ff4f00]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#430000]">
          Welcome to Servocci Counsellors
        </h2>

        <form onSubmit={handleProceed} className="flex flex-col gap-6">
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
