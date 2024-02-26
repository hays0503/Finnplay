import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect } from "react";

/**
 * Represents the header component.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    // Проверка авторизации
    if (!localStorage.getItem("login")) {
      alert("Для доступа к этой странице необходимо авторизоваться");
      return navigate("/");
    }
  }, []);

  return (
    <header className="header">
      <div className="logo2">
        <img className="logo-icon2" loading="eager" alt="" src="/logo.svg" />
        <img
          className="game-portfolio-icon2"
          alt=""
          src="/game-portfolio.svg"
        />
      </div>
      <div className="player-1">
        {localStorage.getItem("login")
          ? localStorage.getItem("login")
          : "Не авторизован пользователь"}
      </div>
      <div className="icons-profile-16px-parent">
        <img
          className="icons-profile-16px"
          loading="eager"
          alt=""
          src="/icons--profile-16px.svg"
        />
        <div
          className="logout"
          onClick={() => {
            localStorage.clear();
            return navigate("/");
          }}
        >
          Logout
        </div>
      </div>
    </header>
  );
};

export default Header;
