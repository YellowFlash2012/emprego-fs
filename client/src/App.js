import Landing from "./pages/Landing";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Error from "./pages/Error";


function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="*" element={<Error/>} />
    </Routes>
    </BrowserRouter>
      
    </div>;
}

export default App;
