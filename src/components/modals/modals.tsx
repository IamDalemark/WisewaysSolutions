"use client";

import { useModal } from "@/components/contexts/ModalContext";
import UserSignUpModal from "@/components/auth/user/UserSignUpModal";
import UserLoginModal from "@/components/auth/user/UserLoginModal";

const Modals = () => {
  const { showSignUpModal, showLogInModal, isLoading } = useModal();

  return (
    <>
      <UserSignUpModal show={showSignUpModal} isLoading={isLoading} />
      <UserLoginModal show={showLogInModal} />
    </>
  );
};

export default Modals;
