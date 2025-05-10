import React from "react";
import { User } from "@supabase/auth-helpers-react";
import { useLogout } from "@/app/hooks/auth/useLogout";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  user: User | null;
}

const UserLoggedInDropDown = ({ user }: Props) => {
  const router = useRouter();
  const { logOut, logOutLoading } = useLogout();

  const onLogout = async () => {
    const result = await logOut();
    if (result!.success) {
      window.location.reload();
    }
  };

  const onResetPassword = () => {
    router.push("/resetpassword");
  };

  return (
    <div
      className="rounded-xl bg-[#f3f3f3] min-h-32 w-60 sm:w-60 mt-10 py-3 px-4 absolute drop-shadow-xl
        overflow-auto -right-[0%] top-[70%]"
    >
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-blue-green">
          {user!.user_metadata.username}
        </p>
        <p className="text-sm font-regular text-[#979797]">{user!.email}</p>
      </div>
      <div className="pt-4">
        <button
          onClick={onResetPassword}
          className="flex text-base text-[#0D767A] py-2 leading-[1] text-left 
                    hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer"
        >
          Reset Password
        </button>
      </div>
      <div className="pt-4">
        {logOutLoading ? (
          <div
            className="flex text-base py-2 leading-[1] text-left 
                    text-[#FD8432] transition-all cursor-pointer"
          >
            Logging Out
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </div>
        ) : (
          <button
            onClick={onLogout}
            className="flex text-base text-[#0D767A] py-2 leading-[1] text-left 
                    hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default UserLoggedInDropDown;
