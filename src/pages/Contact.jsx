import React from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        
        {/* Badge */}
        <button className="bg-black text-white text-xs px-4 py-1 rounded-full mb-4">
          Contact Us
        </button>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Let's Get In Touch.
        </h1>

        <p className="text-gray-500 mt-3 text-sm">
          Or just reach out manually to us at{" "}
          <span className="text-sky-500 cursor-pointer">
            email
          </span>
        </p>

        {/* Form */}
        <form className="mt-10 space-y-5 text-left">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <div className="flex items-center border border-gray-300 bg-white rounded-full px-4 py-3">
              <FaUser className="text-gray-400 mr-3" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <div className="flex items-center border border-gray-300 bg-white rounded-full px-4 py-3">
              <FaEnvelope className="text-gray-400 mr-3" />

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>

            <textarea
              rows="5"
              placeholder="Enter your message"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none resize-none text-sm"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-full transition duration-300"
          >
            Submit Form →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;