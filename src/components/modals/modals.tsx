"use client";

import { useModal } from "@/components/contexts/ModalContext";
import UserSignUpModal from "@/components/auth/user/UserSignUpModal";
import UserLoginModal from "@/components/auth/user/UserLoginModal";

const Modals = () => {
  const { showSignUpModal, showLogInModal, signUpLoading, logInLoading } =
    useModal();

  return (
    <>
      <UserSignUpModal show={showSignUpModal} isLoading={signUpLoading} />
      <UserLoginModal show={showLogInModal} isLoading={logInLoading} />
    </>
  );
};

export default Modals;
