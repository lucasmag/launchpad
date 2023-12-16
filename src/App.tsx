import './App.css'
import Keyboard from "@src/keyboard/components/Keyboard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SongSelection from "@src/screens/song-selection.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/song-list" element={<SongSelection />}/>
        <Route path="/play" element={<Keyboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
