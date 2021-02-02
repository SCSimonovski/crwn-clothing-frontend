import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./snackbar.styles.scss";

let timer;

const Snackbar = ({ message, openSnackbar }) => {
  const snackbarRef = useRef(null);

  const [open, setOpen] = useState(false);

  const h = window.innerHeight - 70;

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    const windowClick = (e) => {
      if (!snackbarRef.current?.contains(e.target)) {
        closeModal();
      }
    };

    window.addEventListener("click", windowClick);

    return () => {
      window.removeEventListener("click", windowClick);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 100);

    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [openSnackbar]);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 100);
  }, []);

  useEffect(() => {}, [open]);

  return (
    <div
      className={`snackbar-container ${open && "snackbar-container--open"}`}
      style={{ top: `${h}px` }}
    >
      <div className="snackbar" ref={snackbarRef}>
        <p className="snackbar-message">{message}</p>
        <button onClick={closeModal} className="button-x">
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
