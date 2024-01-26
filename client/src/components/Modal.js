import React, { useState } from "react";
import axios from 'axios'
import {useCookies} from 'react-cookie'

const Modal = ({mode, setShowModal, task, getTodos}) => {
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookies, removeCookies] = useCookies(null)

  const [data, setData] = useState({
    email: cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 0,
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
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
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
        `${process.env.REACT_APP_SERVER_URL}/todos/`,
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
        window.location.reload()
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
            maxLength={50}
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

          <input onClick={editMode? editTodo : postTodo} className='submit' type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default Modal;
