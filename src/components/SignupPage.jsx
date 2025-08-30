// File: src/components/SignupPage.jsx
import React, { useState } from "react";
import { emailSignup } from "../firebase";

const SignupPage = ({ onBack, onSignupSuccess, onNavigateToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await emailSignup(email, password);
      onSignupSuccess({ username, email: result.user.email, uid: result.user.uid });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1020] text-gray-100 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      {/* Background visuals */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute w-[400px] h-[400px] top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-30 animate-pulse-fast"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="hsl(280, 100%, 70%)"
            d="M42.2,-58.5C53.3,-48.5,60.2,-34.5,66.8,-17.7C73.4,-0.8,79.8,19.3,73.1,34.8C66.3,50.3,46.5,61.1,26.4,65.8C6.3,70.5,-14,69.1,-30,60.8C-46.1,52.4,-57.9,37.1,-63.3,19.9C-68.7,2.8,-67.7,-16.1,-59.8,-30.9C-51.8,-45.8,-36.8,-56.6,-20.9,-63.4C-5,-70.2,10,-72.9,23.3,-69.8C36.6,-66.7,47.9,-57.8,5"
            transform="translate(100 100) scale(1.1)"
          />
        </svg>

        <svg
          className="absolute w-[300px] h-[300px] bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-30 animate-pulse-fast-reverse"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="hsl(190, 100%, 65%)"
            d="M50,-42.6C60.5,-32.7,60.8,-16.4,59.3,-1.9C57.8,12.7,54.4,25.4,46.5,37C38.6,48.6,26.2,59.2,12.8,61.9C-0.6,64.5,-15,59.2,-27.2,51.1C-39.4,43,-49.5,32.2,-53.2,18.8C-57,-4.7,-54.4,-21.9,-46.5,-32.8C-38.6,-43.7,-25.4,-48.3,-11.2,-50.2C3,-52.1,16.2,-51.2,28.6,-48.4C41,-45.6,52,-40.8,50,-42.6Z"
            transform="translate(100 100) scale(1.1)"
          />
        </svg>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6 relative z-10 animate-fade-in-up">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        >
          ←
        </button>

        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-2">
            Create an Account
          </h1>
          <p className="text-sm text-gray-400">Sign up to start your AI-powered trading journey.</p>
        </header>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-full font-bold shadow-lg transform hover:scale-105 transition"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <a href="#" onClick={onNavigateToLogin} className="text-blue-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
