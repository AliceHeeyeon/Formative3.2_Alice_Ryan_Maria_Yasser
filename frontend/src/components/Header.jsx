import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// import context hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useLoginModalContext } from "../hooks/useLoginModalContext";

const Header = () => {
  // bring user through useAuthContext
  const { user } = useAuthContext();
  const { logout } = useLogout();
  // take the dispatch function from context
  const { dispatch } = useLoginModalContext();

  // use the dispatch action to open login modal
  const handleLoginModalClick = () => {
    dispatch({ type: "LOGIN_OPEN" });
  };

  const logoutAlert = () => {
    Swal.fire({
        title: 'Logout',
        text: `Logged out successfully`,
        icon: 'success',
        confirmButtonText: 'OK'
    })
  }

  const handleLogout = () => {
    logout();
    logoutAlert()
  };

  return (
    <div id="header">
      <Link to="/">
        <h1>WUX PROJECT</h1>
      </Link>
      <nav>
        {user && (
          <div>
            <span>Welcome {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!user && (
          <div>
            <button onClick={handleLoginModalClick}>Login</button>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
