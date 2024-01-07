import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = ({mode, setShowModal}) => {
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    email: "",
    title: "",
    process: "",
    date: editMode ? "" : new Date(),
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

    setData(data=> ({
      ...data, [name]: value  //overwriting name parameter
    }))
    console.log(data);
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <img className="close_button" onClick={() => setShowModal(false)} src="https://cdn-icons-png.flaticon.com/128/2734/2734822.png"></img>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleOnChange}
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input
            id="range"
            required
            type="range"
            min={"0"}
            max={"100"}
            value={data.progress}
            onChange={handleOnChange}
            name="progress"
          />

          <input className={mode} type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default Modal;
