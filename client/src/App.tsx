import {BrowserRouter, Route, Routes} from "react-router-dom";
import SongSelection from "@src/pages/song-selection.page.tsx";
import Play from "@src/pages/play.page.tsx";
import {Home} from "@src/pages/home.page.tsx";

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
