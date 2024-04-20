import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-pages/AuthContext";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

type user = {
  user_id: number;
  username: string;
  password: string;
  calorie_goal: string;
  protein_goal: string;
  weight_kg: string;
  height_cm: string;
};

function Home() {
  const navigate = useNavigate();
  const [toggleSettings, setToggleSettings] = useState(false);
  const [editSettings, setEditSettings] = useState(false);
  const [userData, setUserData] = useState<user | null>(null);
  const [calorie, setCalorie] = useState<string>();
  const [protein, setProtein] = useState<string>();
  const [weight, setWeight] = useState<string>();
  const [height, setHeight] = useState<string>();
  const { setLoggedInUser, loggedInUser } = React.useContext(AuthContext);
  const initialData = {
    username: loggedInUser,
  };

  const newData = {
    calorie_goal: calorie,
    protein_goal: protein,
    weight_kg: weight,
    height_cm: height,
    username: loggedInUser,
  };
  useEffect(() => {
    axios
      .post("http://localhost:3003/userinfo", initialData)
      .then((response) => {
        // console.log("cal_goal:" + JSON.stringify(response.data[0].calorie_goal));
        // console.log(response.data)
        setUserData(response.data);
        setCalorie(response.data[0].calorie_goal); // Directly use response.data to set calorie
        setHeight(response.data[0].height_cm); // Directly use response.data to set height
        setProtein(response.data[0].protein_goal); // Directly use response.data to set protein
        setWeight(response.data[0].weight_kg);
        console.log(weight);
      })
      .catch((error) => {
        console.log(error.reponse.data);
      });
  }, []);

  return (
    <>
      {/* <p>{calorie && <>{calorie}</>}</p> */}
      <Minigreeter label="Home Dashboard: "></Minigreeter>
      <div className="meal-option-flex-container">
        <button
          className="meal-option"
          onClick={() => {
            setLoggedInUser(null);
          }}
        >
          Log Out
        </button>
        <button
          className={
            toggleSettings ? "meal-option meal-button-selected" : "meal-option"
          }
          onClick={() => {
            setToggleSettings(!toggleSettings);
            setEditSettings(false);
          }}
        >
          Edit/View User Settings and Goals
        </button>
      </div>
      {toggleSettings && userData && (
        <>
          <h1 style={{ marginLeft: "10px" }}>User Settings and Info: </h1>
          <div className="one-item-card">
            <h1>Hi, {loggedInUser}!</h1>
            <p>Welcome to IntelliFit.</p>
          </div>
          <div className="one-item-card">
            <h1>Goals: </h1>
            {editSettings && (
              <>
                <div
                  className="horizontal-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "50px",
                    fontSize: "20px",
                  }}
                >
                  <p style={{ margin: "0px", fontSize: "18px" }}>
                    Calorie Goal:{" "}
                  </p>{" "}
                  <input
                    type="number"
                    value={calorie}
                    onChange={(e) => {
                      setCalorie(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="horizontal-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "50px",
                    fontSize: "20px",
                  }}
                >
                  <p style={{ margin: "0px", fontSize: "18px" }}>
                    Protein Goal (grams):{" "}
                  </p>{" "}
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => {
                      setProtein(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="horizontal-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "50px",
                    fontSize: "20px",
                  }}
                >
                  <p style={{ margin: "0px", fontSize: "18px" }}>
                    {" "}
                    Weight (kg):{" "}
                  </p>{" "}
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="horizontal-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "50px",
                    fontSize: "20px",
                  }}
                >
                  <p style={{ margin: "0px", fontSize: "18px" }}>
                    {" "}
                    Height (cm):{" "}
                  </p>{" "}
                  <input
                    type="number"
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
                    value={height}
                  />
                </div>
                <button
                  className="meal-option"
                  onClick={() => {
                    setEditSettings(false);
                    axios
                      .post("http://localhost:3003/userinfo/update", newData)
                      .then((response) => {
                        console.log(response.data);
                      })
                      .catch((error) => {
                        console.log(error.response.data);
                      });
                  }}
                >
                  Save
                </button>
              </>
            )}

            {!editSettings && userData && (
              <>
                <div
                  className="horizontal-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "30px",
                    fontSize: "20px",
                  }}
                >
                  <p style={{ margin: "0px" }}>Calorie Goal: </p>{" "}
                  <span>{calorie ? calorie : "Not Set"}</span>
                </div>
                <div
                  className="horizontal-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "30px",
                    fontSize: "20px",
                  }}
                >
                  <p style={{ margin: "0px" }}>Protein Goal (grams): </p>{" "}
                  <span>{protein == null ? "Not Set" : protein}</span>
                </div>
                <div
                  className="horizontal-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "30px",
                    fontSize: "20px",
                  }}
                >
                  <p style={{ margin: "0px" }}> Weight (kg): </p>{" "}
                  <span>{weight == null ? "Not Set" : weight}</span>
                </div>
                <div
                  className="horizontal-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "30px",
                    fontSize: "20px",
                  }}
                >
                  <p style={{ margin: "0px" }}> Height (cm): </p>{" "}
                  <span>{height == null ? "Not Set" : height}</span>
                </div>
                <button
                  className="meal-option"
                  onClick={() => {
                    setEditSettings(true);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </>
      )}
      {!toggleSettings && (
        <>
          <div className="one-item-card">
            <div className="user-info">
              <h1 style={{ marginLeft: "10px" }}>Nutrition Stats (Today): </h1>
              {!editSettings && userData && (
                <>
                  <div
                    className="horizontal-flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "30px",
                      fontSize: "20px",
                    }}
                  >
                    <p style={{ margin: "0px" }}>Calorie Goal: </p>{" "}
                    <span>{calorie ? calorie : "Not Set"}</span>
                  </div>
                  <div
                    className="horizontal-flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "30px",
                      fontSize: "20px",
                    }}
                  >
                    <p style={{ margin: "0px" }}>Protein Goal (grams): </p>{" "}
                    <span>{protein == null ? "Not Set" : protein}</span>
                  </div>
                  <div
                    className="horizontal-flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "30px",
                      fontSize: "20px",
                    }}
                  >
                    <p style={{ margin: "0px" }}> Weight (kg): </p>{" "}
                    <span>{weight == null ? "Not Set" : weight}</span>
                  </div>
                  <div
                    className="horizontal-flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "30px",
                      fontSize: "20px",
                    }}
                  >
                    <p style={{ margin: "0px" }}> Height (cm): </p>{" "}
                    <span>{height == null ? "Not Set" : height}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Home;
