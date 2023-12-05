
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Longin from "./page/Login";
import Desk from "./page/desk";
import './style/style.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Longin/>}></Route>
        <Route path="/desk" element={<Desk/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
