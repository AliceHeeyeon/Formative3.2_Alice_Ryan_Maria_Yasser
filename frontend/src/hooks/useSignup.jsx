import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import Swal from "sweetalert2";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate()

  const signupAlert = (username) => {
    Swal.fire({
        title: 'Sign Up',
        text: `Thanks for signing up ${username}!`,
        icon: 'success',
        confirmButtonText: 'OK'
    })
  }

  const signup = async (username, password) => {
    // disables button to stop requests
    setIsLoading(true);
    // ensure there are no errors
    setError(null);

    // API call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      // end of URL

      if (response.status !== 200) {
        setIsLoading(false);
        setError(error.response.data.error);
      }

      // handle if response is ok
      // status = 200
      if (response.status === 200) {
        // save user local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // navigate to home
        navigate('/')

        // update the auth context - say user is signed in
        // dispatch with the relevant type - "LOGIN"
        dispatch({ type: "LOGIN", payload: response.data });

        // reenable the button
        setIsLoading(false);

        signupAlert(response.data.username)
      }
    } catch (error) {
      console.error(error.response.data.error);
      // update the error state
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  // signup function, isLoading state and error state
  return { signup, isLoading, error };
};
