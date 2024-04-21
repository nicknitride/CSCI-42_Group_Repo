import "../Meals.css";
import "../MealList.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import React from "react";
import { AuthContext } from "./AuthContext";

function Login() {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  // const [loginSuccess, setLoginSuccess] = useState(false);

  const { setLoggedInUser, loggedInUser } = React.useContext(AuthContext);
  const {} = React.useContext(AuthContext);
  const navigate = useNavigate();
  const userNameField = useRef<any>();

  const user = {
    username: username,
    password: password,
  };
  function sendAccountToBackend() {
    if (username != "" && password != "") {
      axios
        .post("http://localhost:3003/login", user)
        .then((response) => {
          if (response.data === "Success") {
            setLoggedInUser(username);
            console.log(loggedInUser);
            navigate("/");
          }
          console.log(response.data)
          setServerMessage(JSON.stringify(response.data));
          setTimeout(() => {
            setServerMessage("");
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setServerMessage(JSON.stringify(error.response.data));
          setTimeout(() => {
            setServerMessage("");
          }, 2000);
        });
    } else if (username === "" || password === "") {
      setServerMessage("Please fill out both fields");
      setTimeout(() => {
        setServerMessage("");
      }, 2000);
    }
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
            <h1>Login</h1>
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
                  onKeyDown={(event)=>{
                    if(event.key === "Enter"){
                      if(serverMessage===""){
                        // Disables input while error message is displaying
                        sendAccountToBackend();
                      } 
                    }
                  }}
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
                  onKeyDown={(event)=>{
                    if(event.key === "Enter"){
                      if(serverMessage===""){
                        // Disables input while error message is displaying
                        sendAccountToBackend();
                      } 
                    }
                  }}
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
                    if(serverMessage===""){
                      // Disables input while error message is displaying
                      sendAccountToBackend();
                    }
                  }}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
          <div className="centered-flex">
            <div className="one-item-card vertical-flex" style={{alignItems:"center"}}>
              <p>Need an Account?</p>
              <div className="meal-option-flex-container" style={{padding:"5px"}}>
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="centered-flex">
            <div className="one-item-card vertical-flex" style={{alignItems:"center"}}>
              <p>Want to See the Overview?</p>
              <div className="meal-option-flex-container" style={{padding:"5px"}}>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go to Welcome Page
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
                serverMessage ? "short-fade-in one-item-card temporary-banner" : "one-item-card temporary-banner"
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
export default Login;
