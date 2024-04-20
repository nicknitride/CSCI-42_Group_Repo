import "../css/Navbar.css";
import gymlogo from "../assets/1_gym.svg";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <div className="outer-nav-flex">
        <div className="left-nav-flex">
          <div className="rounded-button">
            <Link to="/">Home</Link>
          </div>
          <div className="rounded-button">
            <Link to="/workouts">Workouts</Link>
          </div>
          <div className="rounded-button">
            <Link to="/meals">Meal Tracking</Link>
          </div>
          <div className="rounded-button">
            <Link to="/fileops">Import/Export</Link>
          </div>
        </div>
        <div className="nav-logo">
          <img src={gymlogo} alt="Gym Logo" />
          <span>Intellifit {String.fromCharCode(8482)}</span>
        </div>
      </div>
    </>
  );
}
export default Navbar;
