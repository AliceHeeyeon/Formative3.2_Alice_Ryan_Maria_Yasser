import { useState, useContext, createContext } from "react";

const LoginModalContext = createContext();

export const useIsLoginVisible = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginVisible(true);
    console.log("login clicked");
  };

  const handleLoginModalClose = () => {
    setIsLoginVisible(false);
  };
};