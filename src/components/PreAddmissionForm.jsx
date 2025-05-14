import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

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
  
        setTimeout(() => {
          window.location.href = "https://servocci.com";
        }, 800);
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#430000]">
          🎓 Pre-Admission Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
              required
            />
          </div>

          {/* Father's Name */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Father's Name </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
            />
          </div>

          {/* Mother's Name */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Mother's Name </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Date of Birth </label>
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
            <label className="block text-[#2c6975] font-semibold mb-2">Gender </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Phone Number *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
            />
          </div>

          {/* School Name */}
            <div className="flex flex-col">
              <label className="block text-[#2c6975] font-semibold mb-2">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
              />
            </div>

            {/* Preferred Courses */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Preferred Degree Courses </label>
            {formData.courses.map((course, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={course}
                  onChange={(e) => handleCourseChange(e, index)}
                  className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCourse}
              className="mt-3 bg-[#ff4f00] text-white py-2 px-4 rounded-full"
            >
              + Add Another Course
            </button>
          </div>

            {/* Skill Training Courses */}
            <div className="flex flex-col">
              <label className="block text-[#2c6975] font-semibold mb-2">Skill Training Courses</label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(e, index)}
                    className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addSkillCourse}
                className="mt-3 bg-[#ff4f00] text-white py-2 px-4 rounded-full"
              >
                + Add Another Skill Course
              </button>
            </div>


          {/* Preferred Colleges */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Preferred Colleges </label>
            {formData.colleges.map((college, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={college}
                  onChange={(e) => handleCollegeChange(e, index)}
                  className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCollege}
              className="mt-3 bg-[#ff4f00] text-white py-2 px-4 rounded-full"
            >
              + Add Another College
            </button>
          </div>

          {/* Preferred Cities */}
          <div className="flex flex-col">
            <label className="block text-[#2c6975] font-semibold mb-2">Preferred Cities (Domestic / International) *</label>
            {formData.cities.map((city, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => handleCityChange(e, index)}
                  className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCity}
              className="mt-3 bg-[#ff4f00] text-white py-2 px-4 rounded-full"
            >
              + Add Another City
            </button>
          </div>

          {/* Remarks */}
          <div className="flex flex-col md:col-span-2">
            <label className="block text-[#2c6975] font-semibold mb-2">Remarks (Optional)</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="1" // Start small
              className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00] resize-none overflow-hidden"
              placeholder="Any additional information you want to share..."
            />
          </div>

          {/* Counsellor Code */}
            <div className="flex flex-col md:col-span-2">
              <label className="block text-[#2c6975] font-semibold mb-2">Counsellor Code (Optional)</label>
              <input
                type="text"
                name="counsellorCode"
                value={formData.counsellorCode || ""}
                onChange={handleChange}
                className="w-full border-2 border-[#2c6975] p-3 rounded-lg focus:outline-none focus:border-[#ff4f00]"
              />
            </div>

          {/* Consent Checkbox */}
          <div className="flex items-center space-x-2 mt-4 md:col-span-2">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={() => setConsent(!consent)}
              className="h-5 w-5"
            />
            <label htmlFor="consent" className="text-[#2c6975]">
              I consent to the processing of my data and agree to the terms and conditions.
            </label>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center mt-6 md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#ff4f00] text-white py-3 px-10 rounded-xl shadow-lg font-semibold ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PreAdmissionForm;
