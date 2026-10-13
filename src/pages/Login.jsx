import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      
      <div className="w-full md:w-1/2 bg-[#CBE4E8] flex items-center justify-center p-10">
        <img
          src="../assets/images/login_image.png"
          alt="Login"
          className="object-contain max-h-[500px]"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2">Log in to Exclusive</h1>
          <p className="text-gray-500 mb-8">Enter your details below</p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Email or Phone Number"
              className="border-b border-gray-300 py-2 focus:outline-none focus:border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b border-gray-300 py-2 focus:outline-none focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="bg-primaryRed text-white px-10 py-3 rounded hover:bg-red-600 transition-colors"
              >
                Log In
              </button>
              <Link
                to="/forgot-password"
                className="text-primaryRed hover:underline"
              >
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
