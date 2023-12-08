import { BrowserRouter, Routes, Route } from "react-router-dom";
import Longin from "./page/Login";
import Desk from "./page/desk";
import Users from "./componets/users/users";
import Connection from "./componets/connection/connection";
import Live from "./componets/live/Live";

import "./style/style.css";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

function App() {
  const theme = createTheme({
    direction: "rtl",
  });

  return (
    <RTL>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Longin />}></Route>
          <Route path="/desk" element={<Desk />}>
            <Route path="users" element={<Users />}></Route>
            <Route path="connection" element={<Connection />}></Route>
            <Route path="live" element={<Live />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RTL>
  );
}

export default App;
