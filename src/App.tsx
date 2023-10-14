
import "./seats";
import "./App.css";
import Seating from "./seating";
import ThankYou from "./thankyou";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Seating />} />
            <Route path="/thank" element={<ThankYou/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
