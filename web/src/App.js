import React, { useState, useEffect } from 'react';
import api from './services/api'

import './index.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/devForm'
import DevItem from './components/devItem'

function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get('devs')

      setDevs(res.data)
    }
    
    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const res = await api
      .post('/devs', data)

    for (const dev of devs) {
      if (dev.github_username !== res.data.github_username){
        setDevs([...devs, res.data])
      }
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={ dev._id } dev={ dev} />
          ))}
        </ul>  
      </main>
    </div>
  );
}

export default App;
