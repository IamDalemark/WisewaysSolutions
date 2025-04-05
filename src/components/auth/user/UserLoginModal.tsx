import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface UserLoginModalProps {
  show: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

function UserLoginModal({ show, onClose, onOpenSignUp }: UserLoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-teal-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          Log In
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-400 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Enter password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="keepSignedIn" className="w-4 h-4" />
            <label htmlFor="keepSignedIn" className="text-teal-700 text-sm">
              Keep me signed in
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-xl transition"
          >
            Log in
          </button>
        </form>
        <div className="text-sm text-center text-teal-700 mt-4">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>
        <hr className="my-4" />
        <div className="text-center text-sm text-teal-700">
          Don’t have an account?{" "}
          <button
            onClick={onOpenSignUp}
            className="font-semibold hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLoginModal;
