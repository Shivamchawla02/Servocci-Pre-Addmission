import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PreAdmissionForm = () => {
  const [formData, setFormData] = useState({
  fullName: "",
  fatherName: "",
  motherName: "",
  dob: "",
  gender: "",
  phone: "",
  email: "",
  courses: [""],
  skills: [""],
  colleges: [""],
  cities: [""],
  schoolName: "",
  remarks: "",
  counsellorCode: "", // NEW FIELD
});


  const [consent, setConsent] = useState(false); // State for consent checkbox
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("en"); // 'en' or 'hi'
  const navigate = useNavigate();

  const texts = {
  en: {
    title: "🎓 Pre-Admission Form",
    fullName: "Full Name *",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    dob: "Date of Birth",
    gender: "Gender",
    genderOptions: ["Select", "Male", "Female", "Other"],
    phone: "Phone Number *",
    email: "Email Address *",
    schoolName: "School Name",
    preferredCourses: "Preferred Degree Courses",
    skillTraining: "Skill Training Courses",
    preferredColleges: "Preferred Colleges",
    preferredCities: "Preferred Cities (Domestic / International)",
    remarks: "Remarks (Optional)",
    counsellorCode: "Counsellor Code (Optional)",
    consent: "I consent to the processing of my data and agree to the terms and conditions.",
    addAnotherCourse: "+ Add Another Course",
    addAnotherSkill: "+ Add Another Skill Course",
    addAnotherCollege: "+ Add Another College",
    addAnotherCity: "+ Add Another City",
    submit: "Submit Application",
    submitting: "Submitting...",
  },
  hi: {
    title: "🎓 पूर्व-प्रवेश फॉर्म",
    fullName: "पूरा नाम *",
    fatherName: "पिता का नाम",
    motherName: "माता का नाम",
    dob: "जन्म तिथि",
    gender: "लिंग",
    genderOptions: ["चुनें", "पुरुष", "महिला", "अन्य"],
    phone: "फ़ोन नंबर *",
    email: "ईमेल पता *",
    schoolName: "स्कूल का नाम",
    preferredCourses: "पसंदीदा डिग्री पाठ्यक्रम",
    skillTraining: "कौशल प्रशिक्षण पाठ्यक्रम",
    preferredColleges: "पसंदीदा कॉलेज",
    preferredCities: "पसंदीदा शहर (घरेलू / अंतरराष्ट्रीय)",
    remarks: "टिप्पणियाँ (वैकल्पिक)",
    counsellorCode: "सलाहकार कोड (वैकल्पिक)",
    consent: "मैं अपने डेटा की प्रक्रिया के लिए सहमति देता/देती हूं और नियमों व शर्तों से सहमत हूं।",
    addAnotherCourse: "+ एक और पाठ्यक्रम जोड़ें",
    addAnotherSkill: "+ एक और कौशल पाठ्यक्रम जोड़ें",
    addAnotherCollege: "+ एक और कॉलेज जोड़ें",
    addAnotherCity: "+ एक और शहर जोड़ें",
    submit: "आवेदन जमा करें",
    submitting: "जमा हो रहा है...",
  },
};


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Auto-resize the textarea when typing in remarks
    if (e.target.tagName === "TEXTAREA") {
      e.target.style.height = "auto"; // Reset height
      e.target.style.height = e.target.scrollHeight + "px"; // Set new height
    }
  
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseChange = (e, index) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = e.target.value;
    setFormData({ ...formData, courses: updatedCourses });
  };

  const handleSkillChange = (e, index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = e.target.value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleCollegeChange = (e, index) => {
    const updatedColleges = [...formData.colleges];
    updatedColleges[index] = e.target.value;
    setFormData({ ...formData, colleges: updatedColleges });
  };

  const handleCityChange = (e, index) => {
    const updatedCities = [...formData.cities];
    updatedCities[index] = e.target.value;
    setFormData({ ...formData, cities: updatedCities });
  };

  const addCourse = () => {
    if (formData.courses.length < 3) {
      const lastCourse = formData.courses[formData.courses.length - 1];
      if (lastCourse.trim() !== "") {  // Check if the last course input is not empty
        setFormData({ ...formData, courses: [...formData.courses, ""] });
      } else {
        toast.error("Please fill the current course before adding another.");
      }
    } else {
      toast.error("You can add up to 3 courses only.");
    }
  };

  const addSkillCourse = () => {
    if (formData.skills.length < 3) {
      const lastSkill = formData.skills[formData.skills.length - 1];
      if (lastSkill.trim() !== "") {
        setFormData({ ...formData, skills: [...formData.skills, ""] });
      } else {
        toast.error("Please fill the current skill course before adding another.");
      }
    } else {
      toast.error("You can add up to 3 skill training courses only.");
    }
  };

  const addCollege = () => {
    if (formData.colleges.length < 3) {
      const lastCollege = formData.colleges[formData.colleges.length - 1];
      if (lastCollege.trim() !== "") {  // Check if the last college input is not empty
        setFormData({ ...formData, colleges: [...formData.colleges, ""] });
      } else {
        toast.error("Please fill the current college before adding another.");
      }
    } else {
      toast.error("You can add up to 3 colleges only.");
    }
  };

  const addCity = () => {
    if (formData.cities.length < 3) {
      const lastCity = formData.cities[formData.cities.length - 1];
      if (lastCity.trim() !== "") {  // Check if the last city input is not empty
        setFormData({ ...formData, cities: [...formData.cities, ""] });
      } else {
        toast.error("Please fill the current city before adding another.");
      }
    } else {
      toast.error("You can add up to 3 cities only.");
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return; // Prevent re-submission
    setIsSubmitting(true); // Start loading
  
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast.error("Please fill in Full Name, Email, and Phone Number!");
      setIsSubmitting(false);
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone number must be 10 digits!");
      setIsSubmitting(false);
      return;
    }
    if (!consent) {
      toast.error("Please give your consent to proceed.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post('https://pre-addmission-backend.onrender.com/api/submit-form', formData);
  
      if (response.status === 200) {
        toast.success("Form submitted successfully!");
  
        setFormData({
          fullName: "",
          fatherName: "",
          motherName: "",
          dob: "",
          gender: "",
          phone: "",
          email: "",
          courses: [""],
          skills: [""],
          colleges: [""],
          cities: [""],
          schoolName: "",
          remarks: "",
          counsellorCode: "",
        });

        setConsent(false);
  
       navigate("/thank-you");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset loading
    }
  };
    
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-r from-[#001b48] to-[#ff4f00]">
      <div className="bg-[#ffffff] p-10 rounded-3xl shadow-2xl w-full max-w-4xl">
        <div className="flex justify-end mb-4">
  <button
    onClick={() => setLanguage(language === "en" ? "hi" : "en")}
    className="bg-[#ff4f00] text-white px-4 py-1 rounded-full font-semibold"
  >
    {language === "en" ? "हिन्दी" : "English"}
  </button>
</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#430000]">
      {texts[language].title}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Full Name */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].fullName}
    </label>
    <input
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      placeholder={texts[language].fullName}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
      required
    />
  </div>

  {/* Father's Name */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].fatherName}
    </label>
    <input
      type="text"
      name="fatherName"
      value={formData.fatherName}
      onChange={handleChange}
      placeholder={texts[language].fatherName}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
    />
  </div>

  {/* Mother's Name */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].motherName}
    </label>
    <input
      type="text"
      name="motherName"
      value={formData.motherName}
      onChange={handleChange}
      placeholder={texts[language].motherName}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
    />
  </div>

  {/* Date of Birth */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].dob}
    </label>
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
    />
  </div>

  {/* Gender */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].gender}
    </label>
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
    >
      {texts[language].genderOptions.map((option, i) => (
        <option key={i} value={i === 0 ? "" : option}>
          {option}
        </option>
      ))}
    </select>
  </div>

  {/* Phone */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].phone}
    </label>
    <input
      type="text"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder={texts[language].phone}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
    />
  </div>

  {/* Email */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].email}
    </label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder={texts[language].email}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
    />
  </div>

  {/* School Name */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].schoolName}
    </label>
    <input
      type="text"
      name="schoolName"
      value={formData.schoolName}
      onChange={handleChange}
      placeholder={texts[language].schoolName}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
    />
  </div>

  {/* Preferred Degree Courses */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].preferredCourses}
    </label>
    {formData.courses.map((course, index) => (
      <div key={index} className="flex items-center space-x-3">
        <input
          type="text"
          value={course}
          onChange={(e) => handleCourseChange(e, index)}
          placeholder={texts[language].preferredCourses}
          className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
        />
      </div>
    ))}
    <button
      type="button"
      onClick={addCourse}
      className="mt-3 bg-[#ff4f00] text-white py-2 px-4 rounded-full"
    >
      {texts[language].addAnotherCourse}
    </button>
  </div>

  {/* Skill Training Courses */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].skillTraining}
    </label>
    {formData.skills.map((skill, index) => (
      <div key={index} className="flex items-center space-x-3">
        <input
          type="text"
          value={skill}
          onChange={(e) => handleSkillChange(e, index)}
          placeholder={texts[language].skillTraining}
          className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
        />
      </div>
    ))}
    <button
      type="button"
      onClick={addSkillCourse}
      className="mt-3 bg-[#ff4f00] text-white py-2 px-4 rounded-full"
    >
      {texts[language].addAnotherSkill}
    </button>
  </div>

  {/* Preferred Colleges */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].preferredColleges}
    </label>
    {formData.colleges.map((college, index) => (
      <div key={index} className="flex items-center space-x-3">
        <input
          type="text"
          value={college}
          onChange={(e) => handleCollegeChange(e, index)}
          placeholder={texts[language].preferredColleges}
          className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
        />
      </div>
    ))}
    <button
      type="button"
      onClick={addCollege}
      className="mt-3 bg-[#ff4f00] text-white py-2 px-4 rounded-full"
    >
      {texts[language].addAnotherCollege}
    </button>
  </div>

  {/* Preferred Cities */}
  <div className="flex flex-col">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].preferredCities}
    </label>
    {formData.cities.map((city, index) => (
      <div key={index} className="flex items-center space-x-3">
        <input
          type="text"
          value={city}
          onChange={(e) => handleCityChange(e, index)}
          placeholder={texts[language].preferredCities}
          className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
        />
      </div>
    ))}
    <button
      type="button"
      onClick={addCity}
      className="mt-3 bg-[#ff4f00] text-white py-2 px-4 rounded-full"
    >
      {texts[language].addAnotherCity}
    </button>
  </div>

  {/* Remarks */}
  <div className="flex flex-col md:col-span-2">
    <label className="block text-[#2c6975] font-semibold mb-2">
      {texts[language].remarks}
    </label>
    <textarea
      name="remarks"
      value={formData.remarks}
      onChange={handleChange}
      placeholder={texts[language].remarks}
      rows={4}
      className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
    />
  </div>

  {/* Consent Checkbox */}
  <div className="flex items-center md:col-span-2 space-x-3">
    <input
      type="checkbox"
      id="consent"
      checked={consent}
      onChange={(e) => setConsent(e.target.checked)}
      required
      className="h-5 w-5 text-[#ff4f00] focus:ring-[#ff4f00]"
    />
    <label
      htmlFor="consent"
      className="text-[#2c6975] font-semibold"
    >
      {texts[language].consent}
    </label>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={isSubmitting}
    className="md:col-span-2 bg-[#ff4f00] text-white py-3 rounded-full font-bold hover:bg-[#e14800] transition"
  >
    {isSubmitting ? texts[language].submitting : texts[language].submit}
  </button>
</form>

      </div>

      <ToastContainer />
    </div>
  );
};

export default PreAdmissionForm;
