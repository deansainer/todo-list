import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader'
import axios from 'axios'
import ListItem from './components/ListItem'
import Auth from './components/Auth';

function App() {
  const authToken = false;
  const [tasks, setTasks] = useState([])
  async function getTodos() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/todos`)
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 
  useEffect(() => {
    if (authToken){
      getTodos()
    }
  }, [])

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && <>
      <ListHeader listname={tasks.length > 0 ? 'Your task list' : 'Your task list is empty.'} getTodos={getTodos}/>
      {tasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map((task) => (
        <ListItem key={task.id} task={task} getTodos={getTodos}/>
      ))}
      </>}
</div>
  );
}

export default App;
