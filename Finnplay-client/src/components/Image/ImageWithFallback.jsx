import React, { useRef } from 'react';

const  ImageWithFallback  =  (props) => {
  // Состояние для хранения URL текущего изображения
  const imgSrc = useRef(props.src);

  // Обработчик ошибки загрузки изображения
  const handleError = () => {
    console.log(1)
    // Заменяем изображение на URL изображения-заглушки
    imgSrc.current.src = "/404.png";
  };

  return (
    <img
      ref={imgSrc}
      alt={props.alt}
      onError={handleError}
      // Дополнительные свойства (например, классы или стили) можно передать через rest оператор
      {...props}
    />
  );
}

export default ImageWithFallback;
