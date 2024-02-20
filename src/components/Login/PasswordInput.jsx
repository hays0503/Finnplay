import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./PasswordInput.css";

/**
 * Компонент PasswordInput представляет поле ввода для ввода пароля.
 * Он предоставляет функциональность скрытия/отображения пароля и обработки позиции курсора.
 *
 * TODO: Есть баг связанный с вставкой и удалением из производного места после действий курсор перемещается в конец
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.LockSymbol - Символ, используемый для представления скрытых символов пароля.
 * @returns {JSX.Element} Компонент PasswordInput.
 */
const PasswordInput = ({ LockSymbol, Password }) => {
  const [inputType, setInputType] = useState(false); // Состояние для отслеживания типа ввода (скрыт/показан)
  const [password, setTruePassword] = useState(""); // Состояние для хранения реального пароля
  const [fakePassword, setFakePassword] = useState(""); // Состояние для хранения поддельного пароля (замаскированного)
  let cursorPosition = useRef([]); // Ссылка для хранения текущей позиции курсора

  const setPassword = (value) => {
    Password.current = value;
    setTruePassword(value);
  };

  /**
   * Функция для удаления символов из строки
   * @param {*} str строка
   * @param {*} start это индекс, с которого начинается удаление
   * @param {*} end это индекс, который удаляется
   * @returns
   */
  const removeCharacters = (str, start, end) => {
    return str.slice(0, start) + str.slice(end + 1);
  };

  /**
   * Вставляет символ в строку на указанной позиции.
   *
   * @param {string} str - Исходная строка.
   * @param {number} pos - Позиция, на которой нужно вставить символ.
   * @param {string} symbol - Символ для вставки.
   * @returns {string} Измененная строка с вставленным символом.
   */
  const insertInPos = (str, pos, symbol) => {
    return str.slice(0, pos) + symbol + str.slice(pos);
  };

  /**
   * Обработчик изменения позиции курсора
   * @param {*} e событие
   */
  const handleCursorChange = (e) => {
    const action = e.nativeEvent.type;
    if (action == "click" || action == "keydown") {
      // Получение текущей позиции курсора
      if (!inputType) {
        const positionEnd = e.target.selectionEnd;
        const positionStart = e.target.selectionStart;
        cursorPosition = [positionStart, positionEnd];
      } else {
        const positionEnd = e.target.selectionEnd / LockSymbol.length;
        const positionStart = e.target.selectionStart / LockSymbol.length;
        cursorPosition = [positionStart, positionEnd];
      }
    }
  };

  // Эффект для установки поддельного пароля при изменении реального пароля
  useEffect(() => {
    setFakePassword(password.replace(/./g, LockSymbol));
  }, [password,LockSymbol]);

  // Обработчик изменений ввода пароля
  const handlePasswordChange = async (e) => {
    // TODO: Добавить отмену (ctrl+z)
    // TODO: Поправить баг со смещением курсора в режиме скрытого пароля
    // События для различных действий пользователя: ввод символа, вырезание, вставка и т.д.
    if (e.nativeEvent.data !== null) {
      if (cursorPosition[0] < password.length) {
        setPassword(
          insertInPos(password, cursorPosition[0], e.nativeEvent.data),
        );
      } else {
        setPassword(password + e.nativeEvent.data);
      }
    } else {
      if (e.nativeEvent.inputType === "deleteByCut") {
        if (cursorPosition[0] !== cursorPosition[1]) {
          //Удаляем выделенные символы
          setPassword(
            removeCharacters(password, cursorPosition[0], cursorPosition[1]),
          );
        }
      }
      if (e.nativeEvent.inputType === "insertFromPaste") {
        //Вставка из буфера обмена (clipboard)
        const paste = await navigator.clipboard.readText();
        setPassword(insertInPos(password, cursorPosition[0], paste));
      }
      if (e.nativeEvent.inputType === "deleteContentBackward") {
        //Eсли введенный символ - backspace
        //Удаляем символы cursorPosition
        if (cursorPosition[0] !== cursorPosition[1]) {
          //Удаляем выделенные символы
          setPassword(
            removeCharacters(password, cursorPosition[0], cursorPosition[1]),
          );
        } else {
          if (cursorPosition[0] <= password.length) {
            //Удалить с позиции cursorPosition[0] в строке  1 символ
            setPassword(
              password.slice(0, cursorPosition[0] - 1) +
                password.slice(cursorPosition[0]),
            );
          } else {
            //Удаляем один символ перед курсором
            setPassword(password.slice(0, -1));
          }
        }
      }
      if (e.nativeEvent.inputType === "deleteContentForward") {
        //Eсли введенный символ - delete
        //Удаляем символы cursorPosition
        if (cursorPosition[0] !== cursorPosition[1]) {
          //Удаляем выделенные символы
          setPassword(
            removeCharacters(password, cursorPosition[0], cursorPosition[1]),
          );
        } else {
          //Удаляем один символ перед курсором
          if (cursorPosition[0] <= password.length) {
            //Удалить с позиции cursorPosition[0] в строке  1 символ
            setPassword(
              password.slice(0, cursorPosition[0]) +
                password.slice(cursorPosition[0] + 1),
            );
          } else {
            //Удаляем один символ перед курсором
            setPassword(password.slice(0, -1));
          }
        }
      }
    }
  };

  // Функция переключения видимости пароля
  const toggleShowPassword = () => {
    setInputType(!inputType);
  };

  return (
    <div className="input">
      <div className="inputs-text-field">
        <input
          className="text-field-content"
          type="text"
          value={inputType ? password : fakePassword} // заменяет каждый введенный символ на звездочку
          onChange={handlePasswordChange}
          style={{ fontFamily: "Courier New", letterSpacing: "3px" }}
          onClick={handleCursorChange}
          onKeyDown={handleCursorChange}
          onSelect={handleCursorChange}
        />

        <img
          style={{ width: "16px", height: "16px" }}
          onClick={toggleShowPassword}
          src={inputType ? "/lock.svg" : "/icons--showpassword.svg"}
        />
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  LockSymbol: PropTypes.string,
  Password: PropTypes.object,
};

export default PasswordInput;
