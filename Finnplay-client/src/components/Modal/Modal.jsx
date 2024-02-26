import React, { useEffect, useRef, useState } from 'react';
import './Modal.css'; // Убедитесь, что вы импортировали стили

const Modal = (props) => {
  const { isModalOpen, messageModal,setModal} = props;
  const timerClose = useRef(null);
  const timerAnimation = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      clearTimeout(timerClose.current);
      clearTimeout(timerAnimation.current);

      //Запускаем анимацию и закрываем модальное окно через 13 секунд
      timerAnimation.current = setTimeout(() => {
        //Заменяем animation на slideInFromRight
        document.querySelector('.toast').classList.remove('fade-in');
        document.querySelector('.toast').classList.add('fade-out');
      }, 10000);
      timerClose.current = setTimeout(() => {
        setModal({ isOpen: false, message: "" });
      }, 13500);
    }
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div className='toast fade-in'>
          <div className="gradient-background fadeIn">
          <img 
              className="toast-close"
              src="/close.svg"
              alt="close"
              onClick={() => setModal({ isOpen: false, message: "" })}
           />
            {messageModal} 
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
