import { memo, useState } from "react";
import PasswordInput from "./PasswordInput"
import "./LoginForm.css";
import "./Loader.css";


const LoginForm = memo(() => {

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleLogin = (e) => {
    e.preventDefault(); // Предотвращение обычной отправки формы
    // Запустить анимацию загрузки
    setLoading(true);

    // Здесь должен быть ваш асинхронный запрос к API или другой код
    // Для демонстрации, мы просто остановим загрузку через 2 секунды
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };




  return (
    <form className="login-form" onSubmit={handleLogin}>
      <button className="logo">
        <img className="logo-icon" alt="" src="/logo.svg" />
        <img
          className="game-portfolio-icon"
          alt=""
          src="/game-portfolio.svg"
        />
      </button>
      <div className="section-main">
        <div className="input">
          <div className="inputs-text-field">
            <div className="text-field-content">
              <div className="sample-title">Login</div>
              <input
                className="sample-text"
                placeholder="player"
                type="text"
              />
            </div>
          </div>
        </div>
        <PasswordInput LockSymbol='*'/>        
      </div>
      <button className="button button-loader" type="submit" disabled={loading}>
        {loading ? (
          <img src="/icons--spinner-14px.svg" className="spinner" alt="Loading" />
        ) : (
          <div className="save">Login</div> // Текст кнопки
        )}
      </button>
    </form>
  );
});

export default LoginForm;
