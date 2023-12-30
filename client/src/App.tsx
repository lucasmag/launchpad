import {BrowserRouter, Route, Routes} from "react-router-dom";
import SongSelection from "@src/pages/song-selection.page.tsx";
import Play from "@src/pages/play.page.tsx";
import {Home} from "@src/pages/home.page.tsx";
import {setupStore} from "@src/state/store.ts";
import {Provider} from "react-redux";


export function RoutesContainer() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/song-list" element={<SongSelection />}/>
      <Route path="/play" element={<Play />}/>
    </Routes>
  )
}
function App() {
  return (
    <Provider store={setupStore()}>
      <BrowserRouter>
        <RoutesContainer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
