import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SongSelection from "@src/screens/song-selection.screen.tsx";
import Play from "@src/screens/play.screen.tsx";
import {Home} from "@src/screens/home.screen.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/song-list" element={<SongSelection />}/>
        <Route path="/play" element={<Play />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
