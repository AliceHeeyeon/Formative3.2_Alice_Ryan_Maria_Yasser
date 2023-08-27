import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Header = ({ onLoginClick }) => {
  //Bring user through useAuthContext
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>WUX PROJECT</h1>
      <nav>
        {user && (
          <div>
            <span>Welcome {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!user && (
          <div>
            <button onClick={onLoginClick}>Login</button>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
