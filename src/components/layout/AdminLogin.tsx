"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleLogin = () => {
    console.log("Logging in with", { email, password, keepSignedIn });
  };

  return (
    <div className="bg-white p-6 w-[90%] max-w-md mx-auto mt-10 rounded-2xl shadow-2xl">
      <div className="flex justify-center mb-4">
        <Image src={"/wiseways_navbar_logo.png"} alt="WiseWays Solution logo" width={190} height={51.5} className="mx-5 my-1"></Image>
      </div>
      <div className="text-center text-blue-green-dark text-2xl font-semibold mb-4">
        Admin Log In
      </div>
      <div className="mb-4">
        <label className="text-blue-green-dark block mb-1">Email</label>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2 relative">
        <label className="text-blue-green-dark block mb-1">Password</label>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="absolute right-3 top-9 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="keepSignedIn"
          checked={keepSignedIn}
          onChange={() => setKeepSignedIn((prev) => !prev)}
          className="mr-2"
        />
        <label htmlFor="keepSignedIn" className="text-blue-green text-sm">
          Keep Me Signed In
        </label>
      </div>
      <Button
        className="w-full bg-blue-green hover:bg-blue-green-dark"
        onClick={handleLogin}
      >
        Log In
      </Button>
    </div>
  );
};

export default AdminLogin;