import "../Meals.css";
import "../MealList.css";
import Minigreeter from "../../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function SignUp() {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
 const navigate = useNavigate();
  const userNameField = useRef<any>();

  const user = {
    username: username,
    password: password,
  };
  function sendAccountToBackend() {
    if (username !== "" && password !== "") {
      axios
        .post("http://localhost:3003/register", user)
        .then((response) => {
          console.log("Account Registered");
          setServerMessage(JSON.stringify(response.data)+"\n Redirecting to Login Page");
          setTimeout(() => {
            setServerMessage("");
          }, 2000);
          setRegisterSuccess(true);
          setTimeout(()=>{navigate("/login")},1000)
        })
        .catch((error) => {
          console.log(error.response.data);
          setServerMessage(JSON.stringify(error.response.data));
          setTimeout(() => {
            setServerMessage("");
          }, 2000);
        });
    }
    setServerMessage(JSON.stringify("Invalid username or password"));
    setTimeout(() => {
      setServerMessage("");
    }, 2000);
  }

  // Focus on username input on page load
  useEffect(() => {
    userNameField.current.focus();
  }, []);
  return (
    <>
      {
        <>
          <div
            className="centered-flex"
            style={{
              paddingTop: "10px",
              fontSize: "20px",
              fontFamily: "Arial",
            }}
          >
            <h1>Create An Account</h1>
          </div>

          {/* <div className="testing-block">
            <p>Username: {username}</p>
            <p>Password: {password}</p>
          </div> */}

          <div className="sign-up-container">
            <div className="vertical-flex sign-up">
              <div className="vertical-flex">
                <h5>Username:</h5>
                <input
                  type="text"
                  id="usernameinput"
                  onChange={(e) => {
                    SetUsername(e.target.value);
                  }}
                  required
                  ref={userNameField}
                />
              </div>
              <div className="vertical-flex">
                <h5>Password: </h5>
                <input
                  type="password"
                  id="passwordinput"
                  onChange={(e) => {
                    SetPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="meal-option-flex-container">
                <button
                  className="meal-option"
                  onClick={() => {
                    sendAccountToBackend();
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      }
      {serverMessage && (
        <>
          <span>
            <h3
              className={
                serverMessage ? "short-fade-in one-item-card" : "one-item-card"
              }
            >
              {serverMessage}
            </h3>
          </span>
        </>
      )}
    </>
  );
}
export default SignUp;
