//Med følgende importer vi Router. Det vil sige vi kan lave flere sider.
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Index from './pages/Index';
import CreateTasting from './pages/CreateTasting';
import JoinSession from './pages/JoinSession';

function App() {

  return (
      <div >
        
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Index></Index>}/>
          <Route path="/join" element={<JoinSession></JoinSession>}/>
          <Route path="/opret" element={<CreateTasting></CreateTasting>}/>
          {/* <Route path="/apitest" element={<ApiTestPage></ApiTestPage>}/> */}
          {/* <Route path="/Profile" element={<VinPage></VinPage>}/> */}
         



        </Routes>
      </BrowserRouter>
      </div>
  )

}

export default App
