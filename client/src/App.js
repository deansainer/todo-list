import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader'
import axios from 'axios'
import ListItem from './components/ListItem'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get('http://localhost:8000/api/todos')
        setTasks(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [])

  return (
    <div className="app">
      <ListHeader listname={'Holiday Tick List'}/>
      {tasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map((task) => (
        <ListItem key={task.id} task={task}/>
      ))}
    </div>
  );
}

export default App;
