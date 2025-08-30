// // File: src/components/LoginPage.jsx
// import React, { useState } from "react";

// const LoginPage = ({ onBack, onLoginSuccess, onNavigateToSignup }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     // Simulate login API call
//     setTimeout(() => {
//       if (email && password) {
//         onLoginSuccess({ email });
//       } else {
//         setError("Please enter both email and password.");
//       }
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-[#0E1020] text-gray-100 p-8 flex flex-col items-center justify-center font-sans relative overflow-hidden">
//       {/* Background visuals */}
//       <div className="absolute inset-0 z-0">
//         <svg
//           className="absolute w-[400px] h-[400px] top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-30 animate-pulse-fast"
//           viewBox="0 0 200 200"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill="hsl(220, 100%, 70%)"
//             d="M42.2,-58.5C53.3,-48.5,60.2,-34.5,66.8,-17.7C73.4,-0.8,79.8,19.3,73.1,34.8C66.3,50.3,46.5,61.1,26.4,65.8C6.3,70.5,-14,69.1,-30,60.8C-46.1,52.4,-57.9,37.1,-63.3,19.9C-68.7,2.8,-67.7,-16.1,-59.8,-30.9C-51.8,-45.8,-36.8,-56.6,-20.9,-63.4C-5,-70.2,10,-72.9,23.3,-69.8C36.6,-66.7,47.9,-57.8,5"
//             transform="translate(100 100) scale(1.1)"
//           />
//         </svg>

//         <svg
//           className="absolute w-[300px] h-[300px] bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-30 animate-pulse-fast-reverse"
//           viewBox="0 0 200 200"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill="hsl(180, 100%, 65%)"
//             d="M50,-42.6C60.5,-32.7,60.8,-16.4,59.3,-1.9C57.8,12.7,54.4,25.4,46.5,37C38.6,48.6,26.2,59.2,12.8,61.9C-0.6,64.5,-15,59.2,-27.2,51.1C-39.4,43,-49.5,32.2,-53.2,18.8C-57,-4.7,-54.4,-21.9,-46.5,-32.8C-38.6,-43.7,-25.4,-48.3,-11.2,-50.2C3,-52.1,16.2,-51.2,28.6,-48.4C41,-45.6,52,-40.8,50,-42.6Z"
//             transform="translate(100 100) scale(1.1)"
//           />
//         </svg>
//       </div>

//       {/* Login card */}
//       <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6 relative z-10 animate-fade-in-up">
//         {/* Back button */}
//         <button
//           onClick={onBack}
//           className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
//         >
//           <svg
//             className="w-6 h-6 text-gray-300"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             ></path>
//           </svg>
//         </button>

//         {/* Header */}
//         <header className="text-center">
//           <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
//             Welcome Back
//           </h1>
//           <p className="text-sm text-gray-400">Log in to continue trading with AI</p>
//         </header>

//         {/* Login form */}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-400 mb-1"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-400 mb-1"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="text-red-400 text-sm text-center">{error}</div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
//           >
//             {isLoading && (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             )}
//             <span>{isLoading ? "Logging in..." : "Log In"}</span>
//           </button>
//         </form>

//         {/* Link to signup */}
//         <div className="text-center text-sm">
//           Don’t have an account?{" "}
//           <a
//             href="#"
//             onClick={onNavigateToSignup}
//             className="text-green-400 hover:underline transition-colors"
//           >
//             Sign Up
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;









// import React, { useState } from "react";
// import { loginWithGoogle, emailLogin } from "../firebase";

// const LoginPage = ({ onBack, onLoginSuccess, onNavigateToSignup }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await emailLogin(email, password);
//       onLoginSuccess(result.user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await loginWithGoogle();
//       onLoginSuccess(result.user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0E1020] flex justify-center items-center text-white">
//       <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
//         <button onClick={onBack} className="text-sm">← Back</button>
//         <h1 className="text-2xl font-bold">Login</h1>

//         {error && <p className="text-red-400">{error}</p>}

//         {/* Email login */}
//         <form onSubmit={handleEmailLogin} className="space-y-3">
//           <input type="email" placeholder="Email" value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 rounded bg-gray-800" required />
//           <input type="password" placeholder="Password" value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 rounded bg-gray-800" required />

//           <button type="submit" className="w-full bg-blue-600 py-3 rounded font-bold hover:bg-blue-700">
//             Login with Email
//           </button>
//         </form>

//         {/* Google login */}
//         <button onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center space-x-2 bg-red-500 py-3 rounded font-bold hover:bg-red-600">
//           <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
//           <span>Login with Google</span>
//         </button>

//         <p className="text-sm text-gray-400 text-center">
//           Don’t have an account?{" "}
//           <a href="#" onClick={onNavigateToSignup} className="text-green-400 hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



// File: src/components/LoginPage.jsx
import React, { useState } from "react";
import { loginWithGoogle, emailLogin } from "../firebase";

const LoginPage = ({ onBack, onLoginSuccess, onNavigateToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await emailLogin(email, password);
      onLoginSuccess(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      onLoginSuccess(result.user);
    } catch (err) {
      setError(err.message);
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
            fill="hsl(220, 100%, 70%)"
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
            fill="hsl(180, 100%, 65%)"
            d="M50,-42.6C60.5,-32.7,60.8,-16.4,59.3,-1.9C57.8,12.7,54.4,25.4,46.5,37C38.6,48.6,26.2,59.2,12.8,61.9C-0.6,64.5,-15,59.2,-27.2,51.1C-39.4,43,-49.5,32.2,-53.2,18.8C-57,-4.7,-54.4,-21.9,-46.5,-32.8C-38.6,-43.7,-25.4,-48.3,-11.2,-50.2C3,-52.1,16.2,-51.2,28.6,-48.4C41,-45.6,52,-40.8,50,-42.6Z"
            transform="translate(100 100) scale(1.1)"
          />
        </svg>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6 relative z-10 animate-fade-in-up">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        >
          ←
        </button>

        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400">Log in to continue trading with AI</p>
        </header>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {/* Email Login */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-full font-bold shadow-lg transform hover:scale-105 transition"
          >
            {isLoading ? "Logging in..." : "Login with Email"}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 py-3 rounded-full font-bold shadow-lg transform hover:scale-105 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Login with Google</span>
        </button>

        <p className="text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <a href="#" onClick={onNavigateToSignup} className="text-green-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;



