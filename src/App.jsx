import Login from "@pages/Login/Login";
import UserGameList from "@pages/UserGame/UserGameList";
import ErrorPage from "@pages/ErrorPage/ErrorPage";
import { Routes, Route } from "react-router-dom";

/**
 * Renders the main application component.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/listgame" element={<UserGameList />} />
      {/* 404 */}
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}
export default App;
