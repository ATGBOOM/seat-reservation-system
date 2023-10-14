import { useState, useEffect } from "react";
import { confirmedSeats, unconfirmedSeats } from "./confirmed_seats";
import { onValue, ref } from "firebase/database";
import { dataRef } from "./config";

interface Props {
  indR: number;
  indC: number;
}

function Seats({ indR, indC }: Props) {
  const occupiedSeats: [[number, number]] = [[-1, -1]];
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    onValue(ref(dataRef), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldarray) => [...oldarray, todo]);
        });
      }
    });
  }, []);
  todos.map((todo) => {
    const seats: any = todo["Seats"];
    seats.forEach((element: any) => {
      occupiedSeats.push(element);
    });
  });

  const [_className, _setClassName] = useState("seat");

  const handleClick = () => {
    let isSeatSelected = true;
    confirmedSeats.forEach((i) => {
      if (i[0] == indC && i[1] == indR) {
        isSeatSelected = false;
        _setClassName("seat");
        unconfirmedSeats.push([indC, indR]);
      }
    });

    if (isSeatSelected) {
      confirmedSeats.push([indC, indR]);
      _setClassName("selected seat");
    }
  };

  const ClassName = () => {
    let a = false;
    occupiedSeats.forEach((i) => {
      if (i[0] == indC && i[1] == indR) {
        a = true;
      }
    });
    if (a) {
      return "seat occupied";
    }
    return _className;
  };

  return (
    <>
      <div
        className={ClassName()}
        onClick={() => {
          if (ClassName() != "seat occupied") {
            handleClick();
          }
        }}
      ></div>
    </>
  );
}

export default Seats;
