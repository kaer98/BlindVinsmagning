//Med følgende importer vi Router. Det vil sige vi kan lave flere sider.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home';
import CreateTasting from './pages/createTasting/CreateTasting';
import JoinSession from './pages/login/LogIn';
import Signup from "./pages/signUp/Signup";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";

function App() {

  return (
    <div className="min-h-full  bg-[#1d232a] flex flex-col"> /* min-h-screen ensures the outermost div is at least the height of the viewport */
      <TopBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<JoinSession />} />
          <Route path="/opret" element={<CreateTasting />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <BottomBar />
    </div>

  )

}

export default App
