import { BrowserRouter, Routes, Route} from "react-router-dom";

import Mainpage from "./components/Mainpage";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import {AudioPlayer} from "./components/AudioPlayer";

import {  useState } from "react";

import PlayList from "./components/PlayList";
import { BarContext } from "./components/BarContext";

export default function App() {
  const [state, setState] = useState();
  return (
      <AudioPlayer>
        <BrowserRouter>
        <BarContext>
          <Topbar />
          <Sidebar />
        </BarContext>
          
          <Routes>
            <Route path="/" element={<Mainpage />}></Route>
            <Route path="/playing" element={<Mainpage />}></Route>
            <Route path="/playlist" Component={PlayList}></Route>
          </Routes>
        </BrowserRouter>
      </AudioPlayer>
    
  );
}
