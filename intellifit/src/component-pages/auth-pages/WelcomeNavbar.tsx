import "./WelcomeScreen.css";
import gymlogo from "../../assets/1_gym.svg";
function WelcomeNavbar() {
  return (
    <>
      <div className="outer-nav-flex">
        <div className="nav-logo">
          <img src={gymlogo} alt="Gym Logo" />
          <span>Intellifit {String.fromCharCode(8482)}</span>
        </div>
          <h1 className="horizontal-flex centered-flex" style={{color:"white", }}>Welcome to IntelliFit!</h1>
      </div>
    </>
  );
}
export default WelcomeNavbar;
