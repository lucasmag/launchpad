import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SongSelection from "@src/screens/song-selection.screen.tsx";
import Play from "@src/screens/play.screen.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/song-list" element={<SongSelection />}/>
        <Route path="/play" element={<Play />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
