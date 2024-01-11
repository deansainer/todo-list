import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader'
import axios from 'axios'
import ListItem from './components/ListItem'

function App() {
  const [tasks, setTasks] = useState([])

  async function getTodos() {
    try {
      const response = await axios.get('http://localhost:8000/api/todos')
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }
console.log(process.env.REACT_APP_SERVER_URL);  
  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="app">
      <ListHeader listname={'Your task list'} getTodos={getTodos}/>
      {tasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map((task) => (
        <ListItem key={task.id} task={task} getTodos={getTodos}/>
      ))}
    </div>
  );
}

export default App;
