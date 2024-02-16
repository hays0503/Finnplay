import "./Header.css";

const Header = () => {
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
      <div className="player-1">Player 1</div>
      <div className="icons-profile-16px-parent">
        <img
          className="icons-profile-16px"
          loading="eager"
          alt=""
          src="/icons--profile-16px.svg"
        />
        <div className="logout">Logout</div>
      </div>
    </header>
  );
};

export default Header;
