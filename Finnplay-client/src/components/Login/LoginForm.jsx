import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import PasswordInput from "./PasswordInput";
import "./LoginForm.css";
import "./Loader.css";


const LoginForm = (props) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const Login = useRef("");
  const Password = useRef("");

  const handleLogin = async (e) => {
    const login = Login.current.value;
    const password = Password.current;

    e.preventDefault(); // Предотвращение обычной отправки формы
    // Запустить анимацию загрузки
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST", // Метод запроса
        headers: {
          "Content-Type": "application/json", // Тип содержимого, который мы отправляем
        },
        body: JSON.stringify({
          username: login,
          password: password,
        }), // Преобразуем данные в строку JSON
      });

      const data = await response.json(); // Парсинг JSON ответа в объект JavaScript

      if (response.ok && data.auth) {
        localStorage.setItem("login", login);
        localStorage.setItem("authToken", data.token);

        props.setModal({
          message: `Добро пожаловать ${login} ! `,
          isOpen: true
        })
        // Перенаправление на страницу списка игр
        return navigate("/listgame");
      } else {
        props.setModal({
          message: `Ошибка аутентификации: ${data.message}`,
          isOpen: true
        })
      }
    } catch (error) {
    } finally {
      setLoading(false); // Остановить анимацию загрузки в любом случае
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <button className="logo">
          <img className="logo-icon" alt="" src="/logo.svg" />
          <img className="game-portfolio-icon" alt="" src="/game-portfolio.svg" />
        </button>
        <div className="section-main">
          <div className="input">
            <div className="inputs-text-field">
              <div className="text-field-contentLogin">
                <div className="sample-title">Login</div>
                <input
                  className="sample-text"
                  placeholder="Enter your login"
                  type="text"
                  ref={Login}
                />
              </div>
            </div>
          </div>
          <PasswordInput LockSymbol="*" Password={Password} />
        </div>
        <button
          className="button-login button-loader"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <img
              src="/icons--spinner-14px.svg"
              className="spinner"
              alt="Loading"
            />
          ) : (
            <div className="save">Login</div> // Текст кнопки
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
