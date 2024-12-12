import { useLogout } from "./useLogout";
import { useAuthContext } from "./useAuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
  }

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const handleTrainingsClick = () => {
    navigate("/")
  }

  return(
    <header>
      <div className="header-container">
        <Link to="/">
          <h1>Trainings App</h1>
          <span className="material-symbols-outlined">directions_bike</span>
          <span className="material-symbols-outlined">sprint</span>
        </Link>
        <nav>
          {user ? (
            <>
              <div>{user.email}</div>
              <button onClick={handleTrainingsClick}>Trainings</button>
              <button onClick={handleProfileClick}>My Profile</button>
              <button onClick={handleClick}>Log out</button>
            </>
            ) :
            (
              <>
                <button onClick={() => navigate("/")}>Login</button>
                <button onClick={() => navigate("/signup")}>Signup</button>
              </>
            )
          }
        </nav>
      </div>
    </header>
  )
}