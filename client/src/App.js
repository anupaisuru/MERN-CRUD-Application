import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import UserList from "./pages/UserList";
import UpdateUser from "./pages/UpdateUser"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/updateuser/:id" element={<UpdateUser/>}/>
      </Routes>
    </div>
  );
}

export default App;

