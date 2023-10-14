import { useState } from "react";
import "./seats";
import "./App.css";
import Seats from "./seats";
import { confirmedSeats, unconfirmedSeats } from "./confirmed_seats";
import { uid } from "uid";
import { ref, set } from "firebase/database";
import { dataRef } from "./config";
import { useNavigate } from "react-router-dom";

function Seating() {
  const seats = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let navigate = useNavigate();

  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");

  const writeToDatabase = () => {
    const newConfirmedSeats = confirmedSeats.filter((seat) => {
      return !unconfirmedSeats.some((unconfirmedSeat) => {
        return seat[0] === unconfirmedSeat[0] && seat[1] === unconfirmedSeat[1];
      });
    });
    if (
      nameText.length != 0 &&
      emailText.length != 0 &&
      newConfirmedSeats.length != 0
    ) {
      const uuid = uid();
      set(ref(dataRef, uuid), {
        nameText,
        emailText,
        Seats: newConfirmedSeats,
        uuid,
      });
      console.log("yes");
      navigate("/thank");
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form action="#">
          <div className="field">
            <input
              type="email"
              onChange={(e) => setEmailText(e.target.value)}
              required
            ></input>
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="name"
              onChange={(e) => setNameText(e.target.value)}
              required
            ></input>
            <label>Name</label>
          </div>
        </form>
      </div>

      <br></br>
      <div className="centerAll">
        <ul className="showcase">
          <li>
            <div className="seat"></div>
            <small>N/A</small>
          </li>
          <li>
            <div className="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div className="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>

        <div className="container">
          <div className="screen"></div>
        </div>

        {rows.map((j) => {
          return (
            <>
              <div className="row">
                {seats.map((i) => {
                  return (
                    <>
                      <Seats indC={i} indR={j} />
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
        <div className="btndiv">
          <button type="button" className="btn" onClick={writeToDatabase}>
            submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Seating;
