import Landing from "./pages/Landing";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Error from "./pages/Error";
import Register from "./pages/Register";

import "antd/dist/antd.min.css";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/dashboard/Stats";
import AllJobs from "./pages/dashboard/AllJobs";
import AddNewJob from "./pages/dashboard/AddNewJob";
import Profile from "./pages/dashboard/Profile";
import SharedLayout from "./pages/dashboard/SharedLayout";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>

            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats/>}/>
          <Route path="all-jobs" element={<AllJobs/>}/>
          <Route path="add-new-job" element={<AddNewJob/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>

        <Route path="/register" element={<Register />} />
        
        <Route path="*" element={<Error/>} />
    </Routes>
    </BrowserRouter>
      
    </div>;
}

export default App;
