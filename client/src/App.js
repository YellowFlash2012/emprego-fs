import Landing from "./pages/Landing";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Error from "./pages/Error";
import Register from "./pages/Register";

import "antd/dist/antd.min.css";


function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="*" element={<Error/>} />
    </Routes>
    </BrowserRouter>
      
    </div>;
}

export default App;
