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
      <div className="container">
        <Link to="/">
          <h1>Workouts App</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={handleTrainingsClick}>Trainings</button>
              <button onClick={handleProfileClick}>My Profile</button>
              <button onClick={handleClick}>Log out</button>
            </div>
            ) :
            (
              <div>
                <button onClick={() => navigate("/")}>Login</button>
                <button onClick={() => navigate("/signup")}>Signup</button>
              </div>
            )
          }
        </nav>
      </div>
    </header>
  )
}