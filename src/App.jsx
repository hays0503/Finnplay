import Login from "@pages/Login/Login";
import UserGameList from "@pages/UserGame/UserGameList"
import {
  Routes,
  Route,
  // useNavigationType,
  // useLocation,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/listgame" element={<UserGameList/>} />
    </Routes>
  );
}
export default App;
