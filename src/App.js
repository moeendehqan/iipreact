
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Longin from "./page/Login";
import Desk from "./page/desk";
import Users from "./componets/users/users";
import Connection from "./componets/connection/connection";
import Live from "./componets/live/Live";

import './style/style.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Longin/>}></Route>
        <Route path="/desk" element={<Desk/>}>
          <Route path="users" element={<Users />}></Route>
          <Route path="connection" element={<Connection />}></Route>
          <Route path="live" element={<Live />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
