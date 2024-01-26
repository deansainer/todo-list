import React from "react";
import { useEffect, useState } from 'react';
import ListHeader from './ListHeader'
import axios from 'axios'
import ListItem from './ListItem'
import Auth from './Auth';
import { useCookies } from 'react-cookie';

const TodoList = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  const [tasks, setTasks] = useState([]);

  async function getTodos() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`,
        {
          params: { email: userEmail },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (authToken) {
      getTodos();
    }
  }, []);

  return <div>
    {userEmail && <span className='user_email'>{userEmail}</span>}
      {!authToken && <Auth/>}
      {authToken && <>
      <ListHeader listname={tasks.length > 0 ? 'Your task list' : 'Your task list is empty.'} getTodos={getTodos}/>
      {tasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map((task) => (
        <ListItem key={task.id} task={task} getTodos={getTodos}/>
      ))}
      </>}
    </div>;
};

export default TodoList;
