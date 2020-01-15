import React, { useState, useEffect } from 'react'
import './styles.css'

function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState('')
  const [techs, setTechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setlongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords

        setLatitude(latitude)
        setlongitude(longitude)
      },
      (err) => {
        console.warn(err)
      },
      {
        timeout: 30000,
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    })

    setGithubUsername('')
    setTechs('')
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="input_block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input 
          name="github_username" 
          id="github_username" 
          value={ github_username }
          onChange={ e => setGithubUsername(e.target.value) }
          required
        />
      </div>

      <div className="input_block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          name="techs" 
          id="techs" 
          value={ techs }
          onChange={ e => setTechs(e.target.value) }
          required
        />
      </div>

      <div className="input_group">
        <div className="input_block">
          <label htmlFor="latitude">Latitude</label>
          <input
            name="latitude"
            id="latitude"
            required
            value={ latitude }
            onChange={ e => setLatitude(e.target.value) }
          />
        </div>

        <div className="input_block">
          <label htmlFor="longitude">Longitude</label>
          <input
            name="longitude"
            id="longitude"
            required
            value={ longitude }
            onChange={ e => setlongitude(e.target.value) }
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
}

export default DevForm