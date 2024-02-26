import Login from "@pages/Login/Login";
import UserGameList from "@pages/UserGame/UserGameList";
import ErrorPage from "@pages/ErrorPage/ErrorPage";
import { Routes, Route } from "react-router-dom";
import Modal from "@components/Modal/Modal";
import { useState } from "react";

/**
 * Renders the main application component.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  const [modalWindow, setModalWindow] = useState({isOpen: false, message: ""});

  const toggleModal = (data) => {
    console.log("toggleModal ",data);
    setModalWindow({
      message: data.message,
      isOpen: data.isOpen
    });
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<Login setModal={toggleModal}/>} />
      <Route path="/listgame" element={<UserGameList  setModal={toggleModal} />} />
      {/* 404 */}
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
    <Modal isModalOpen={modalWindow.isOpen} messageModal={modalWindow.message} setModal={toggleModal}/>
    </>
  );
}
export default App;
