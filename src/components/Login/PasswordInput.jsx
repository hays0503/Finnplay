import React, { useState,useRef } from 'react';
import "./PasswordInput.css";

const PasswordInput = () => {
    const [inputType, setInputType] = useState(true);
    const [password, setPassword] = useState('');
    const [fakePassword,setFakePassword] = useState('');
    const [cursorPosition, setCursorPosition] = useState([]);
    const inputRef = useRef();
  
    const handleCursorChange = (e) => {
      // Получение текущей позиции курсора
        const positionEnd = e.target.selectionEnd;
        const positionStart = e.target.selectionStart;
        setCursorPosition([positionStart, positionEnd]);
        console.log(cursorPosition);
    };

    const handlePasswordChange = (e) => {
        console.log(e);      
        if(e.nativeEvent.data!==null){
            setPassword(password+e.nativeEvent.data);
            setFakePassword(fakePassword+'*');
            console.log(password);
        }else{
            if(e.nativeEvent.inputType === "deleteContentForward"){                
                //Eсли введенный символ - backspace
                //Удаляем символы cursorPosition
                if(cursorPosition[0] !== cursorPosition[1])
                {
                    //Удаляем выделенные символы
                    setPassword(password.slice(0, cursorPosition[0]) + password.slice(cursorPosition[1]));
                    setFakePassword(fakePassword.slice(0, cursorPosition[0]) + fakePassword.slice(cursorPosition[1]));
                }else{
                    //Удаляем один символ перед курсором
                    setPassword(password.slice(0, cursorPosition[0]-1) + password.slice(cursorPosition[0]));
                    setFakePassword(fakePassword.slice(0, cursorPosition[0]-1) + fakePassword.slice(cursorPosition[0]));
                }
            }
            if(e.nativeEvent.inputType === "deleteContentBackward"){
                //Eсли введенный символ - delete
                //Удаляем символы cursorPosition
                if(cursorPosition[0] !== cursorPosition[1])
                {
                    //Удаляем выделенные символы
                    // setPassword(password.slice(0, cursorPosition[0]) + password.slice(cursorPosition[1]));
                    // setFakePassword(fakePassword.slice(0, cursorPosition[0]) + fakePassword.slice(cursorPosition[1]));
                }else{
                    //Удаляем один символ перед курсором

                }
            }
            
        }
    };

    const toggleShowPassword = () => {
        setInputType(!inputType);
        setFakePassword(inputType? password : password.replace(/./g, '*'));
    };

    return (
        <div className="input">
            <div className="inputs-text-field">
                <input
                    className="inputs-text-field"
                    type='text'
                    value={fakePassword} // заменяет каждый введенный символ на звездочку
                    onChange={handlePasswordChange}
                    style={{ fontFamily: 'Courier New', letterSpacing: '3px' }}
                    onClick={handleCursorChange}
                    onKeyDown={handleCursorChange}
                    onSelect={handleCursorChange}
                    ref={inputRef}
                />

                <img onClick={toggleShowPassword} 
                src={inputType? "/lock.svg" : "/icons--showpassword.svg"} />

            </div>
        </div>
    );
};

export default PasswordInput;
