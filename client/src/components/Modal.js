import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from 'axios'

const Modal = ({mode, setShowModal, task, getTodos}) => {
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    email: "denys@gmail.com",
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : null,
    date: editMode ? task.date : new Date(),
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

    setData(data=> ({
      ...data, [name]: value  //overwriting name parameter
    }))
  }

  async function editTodo(e){
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:8000/api/todos/${task.id}`, {
        email: data.email,
        title: data.title,
        progress: data.progress,
        date: data.date,
      })
      if (response.status===200){
        setShowModal(false)
        getTodos()
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function postTodo(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/todos/',
        {
          email: data.email,
          title: data.title,
          progress: data.progress,
          date: data.date,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.status === 200){
        setShowModal(false)
        getTodos()
      }
    } catch (error) {
      console.error(error);
    }
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

          <input onClick={editMode? editTodo : postTodo} className={mode} type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default Modal;
