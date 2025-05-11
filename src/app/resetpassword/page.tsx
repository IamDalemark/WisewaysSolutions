"use client";
import { useToast } from "@/components/contexts/ToastContext";
import { useUser } from "@/components/contexts/UserContext";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ResetPasswordErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface ResetPasswordForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const { changingPassword } = useUser();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [resetForm, setResetForm] = useState<ResetPasswordForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetForm((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user types
    if (errors[name as keyof ResetPasswordErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ResetPasswordErrors];
        return newErrors;
      });
    }
  };

  const validateEmail = () => {
    const newErrors: ResetPasswordErrors = {};
    if (!resetForm.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(resetForm.email))
      newErrors.email = "Email is invalid.";
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors: ResetPasswordErrors = {};
    if (!resetForm.password) newErrors.password = "Password is required.";
    if (!resetForm.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    if (
      resetForm.password &&
      resetForm.confirmPassword &&
      resetForm.password !== resetForm.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (resetForm.password && resetForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    if (changingPassword) {
      const passwordValidationErrors = validatePassword();
      setErrors(passwordValidationErrors);
      if (Object.keys(passwordValidationErrors).length > 0) {
        setLoading(false);
        return;
      }
      const result = await supabase.auth.updateUser({
        password: resetForm.password,
      });
      if (result.error) {
        addToast(result.error.message, "error");
        setLoading(false);
        return;
      }
      addToast("Change Password Successful!", "success");
      router.push("/");
    } else {
      const emailValidationErrors = validateEmail();
      setErrors(emailValidationErrors);
      if (Object.keys(emailValidationErrors).length > 0) {
        setLoading(false);
        return;
      }
      const result = await supabase.auth.resetPasswordForEmail(
        resetForm.email,
        { redirectTo: `${process.env.DOMAIN!}/resetpassword` }
      );
      if (result.error) {
        addToast(result.error.message, "error", 10000);
        setLoading(false);
        return;
      }
      addToast("Verification Email Sent!", "success");
    }
    setLoading(false);
  };

  const onHandleCancel = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full relative border border-gray-200">
        <button
          onClick={onHandleCancel}
          className="absolute top-4 right-4 text-teal-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="text-red-500 text-center mb-2">
              {errors.general}
            </div>
          )}
          {changingPassword ? (
            <>
              <div>
                <label className="block text-teal-700 font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-md px-4 py-2 pr-2 outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="Enter Password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-teal-700 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-xl transition flex items-center justify-center"
          >
            {loading ? (
              <>
                Loading
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : changingPassword ? (
              "Change Password"
            ) : (
              "Send Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
