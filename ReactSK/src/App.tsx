//Med følgende importer vi Router. Det vil sige vi kan lave flere sider.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Index from './pages/Index';
import CreateTasting from './pages/CreateTasting';
import JoinSession from './pages/login/LogIn';
import SignUp from "./pages/signup/SignUp";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";

function App() {

  return (
    <div >
        <div className='flex flex-col h-screen'>
        <TopBar />

      <BrowserRouter>

          <Routes>

            <Route path="/" element={<Index></Index>} />
            <Route path="/join" element={<JoinSession></JoinSession>} />
            <Route path="/opret" element={<CreateTasting></CreateTasting>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            {/* <Route path="/apitest" element={<ApiTestPage></ApiTestPage>}/> */}
            {/* <Route path="/Profile" element={<VinPage></VinPage>}/> */}



          </Routes>
      </BrowserRouter>

      </div >
      <BottomBar/>

    </div>
  )

}

export default App
