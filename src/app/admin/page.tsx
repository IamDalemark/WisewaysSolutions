"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useSignInAdmin from "../hooks/auth/useAdminLogin";

interface LogInErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LogInErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showCalendlyConnect, setShowCalendlyConnect] = useState(false);
  const { signInAdmin, loginLoading } = useSignInAdmin();

  const router = useRouter();

  const validate = (): LogInErrors => {
    const newErrors: LogInErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    
    const result = await signInAdmin(email, password);

    if (result?.success) {
      setSuccessMessage("Login successful!");
      setShowCalendlyConnect(true);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  const connectCalendly = () => {
    window.location.href = "/api/calendly/auth";
  };

  const skipCalendly = () => {
    router.push("/admin/testimonials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3E3E3]">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          Admin Log In
        </h2>
        
        {successMessage && (
          <div className="text-green-500 text-center mb-2">
            {successMessage}
          </div>
        )}

        {!showCalendlyConnect ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="text-red-500 text-center mb-2">
                {errors.general}
              </div>
            )}
            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded-md px-4 py-2 pr-2 outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              <div className="mt-1 text-sm">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                    className="mr-2"
                  />
                  Show password
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-xl transition flex items-center justify-center"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-medium text-teal-700">
              Connect Calendly Account
            </h3>
            <p className="text-gray-600 mb-4">
              Connect your Calendly account to manage appointments directly.
            </p>
            
            <button
              onClick={connectCalendly}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
            >
              Connect Calendly
            </button>
            
            <button
              onClick={skipCalendly}
              className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 rounded-xl transition"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
