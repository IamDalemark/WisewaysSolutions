"use client";

import { useModal } from "@/components/contexts/ModalContext";
import { useEffect } from "react";

interface UserLoginModalProps {
  show: boolean;
  email?: string;
  password?: string;
  showPassword?: boolean;
}

const UserLoginModal = ({
  email = "",
  password = "",
  showPassword = false,
}: UserLoginModalProps) => {
  const {
    showLogInModal,
    closeLogInModal,
    openSignUpModal,
    handleLogIn,
    loginForm,
    setLoginForm,
  } = useModal();

  useEffect(() => {
    setLoginForm({
      email,
      password,
      showPassword,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!showLogInModal && !showPassword) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full relative border border-gray-200">
        <button
          onClick={closeLogInModal}
          className="absolute top-4 right-4 text-teal-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          Log In
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogIn();
          }}
        >
          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              name="username"
              value={loginForm.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter Email"
            />
          </div>

          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={loginForm.showPassword ? "text" : "password"}
                name="password"
                value={loginForm.password}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-4 py-2 pr-2 outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Enter Password"
              />
            </div>
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
            onClick={openSignUpModal}
            className="font-semibold hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLoginModal;
