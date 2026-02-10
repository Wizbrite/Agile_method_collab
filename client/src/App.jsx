import React, { useEffect, useState } from 'react'

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function App() {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    fetch(`${API}/api/tasks`).then(r => r.json()).then(setTasks).catch(console.error)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager (Base Template)</h1>
      <ul>
        {tasks.map(t => (
          <li key={t.id}><strong>{t.title}</strong> — {t.status}</li>
        ))}
      </ul>
    </div>
  )
}
