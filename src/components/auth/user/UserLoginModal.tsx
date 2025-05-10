"use client";

import { useModal } from "@/components/contexts/ModalContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface UserLoginModalProps {
  isLoading: boolean;
  show: boolean;

  // Props for Storybook/testing
  email?: string;
  password?: string;
  showPassword?: boolean;
  validationErrors?: {
    email?: string;
    password?: string;
    general?: string;
  };
}

interface LogInErrors {
  email?: string;
  password?: string;
  general?: string;
}

const UserLoginModal = ({
  isLoading,
  show,
  email = "",
  password = "",
  showPassword = false,
  validationErrors = {},
}: UserLoginModalProps) => {
  const router = useRouter();
  const {
    logInLoading,
    showLogInModal,
    closeLogInModal,
    openSignUpModal,
    handleLogIn: contextLogIn,
    loginForm,
    setLoginForm,
  } = useModal();

  const [errors, setErrors] = useState<LogInErrors>(validationErrors);

  useEffect(() => {
    setLoginForm({
      email: email || "",
      password: password || "",
      showPassword: showPassword || false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, showPassword]);

  useEffect(() => {
    // If storybook sends validation errors, use them
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
  }, [validationErrors]);

  useEffect(() => {
    if (
      loginForm.email === "" &&
      loginForm.password === "" &&
      loginForm.showPassword === false &&
      !show
    ) {
      setErrors({});
    }
  }, [loginForm, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user types
    if (errors[name as keyof LogInErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof LogInErrors];
        return newErrors;
      });
    }
  };

  const validate = (): LogInErrors => {
    const newErrors: LogInErrors = {};
    if (!loginForm.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email))
      newErrors.email = "Email is invalid.";
    if (!loginForm.password) newErrors.password = "Password is required.";
    if (loginForm.password && loginForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const result = await contextLogIn();
    if (!result.success) {
      setErrors({ general: result.error });
    }
  };

  const handleForgetPassword = async () => {
    closeLogInModal();
    router.push("/resetpassword");
  };

  if (!showLogInModal && !show) return null;

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
              value={loginForm.email}
              onChange={handleChange}
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
            <div className="relative">
              <input
                type={loginForm.showPassword ? "text" : "password"}
                name="password"
                value={loginForm.password}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-4 py-2 pr-2 outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || logInLoading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-xl transition flex items-center justify-center"
          >
            {isLoading || logInLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging In...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="text-sm text-center text-teal-700 mt-4">
          <button className="hover:underline" onClick={handleForgetPassword}>
            Forgot Password?
          </button>
        </div>

        <hr className="my-4" />

        <div className="text-center text-sm text-teal-700">
          {"Don't have an account? "}
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
