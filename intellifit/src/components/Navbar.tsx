import "../css/Navbar.css";
import gymlogo from "../assets/1_gym.svg";
function Navbar() {
  return (
    <>
      <div className="outer-nav-flex">
        <div className="left-nav-flex">
          <div className="rounded-button">
            <a href="/">Home</a>
          </div>
          <div className="rounded-button">
            <a href="/workouts">Workouts</a>
          </div>
          <div className="rounded-button">
            <a href="/meals">Meal Tracking</a>
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
