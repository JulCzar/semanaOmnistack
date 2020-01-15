import React from 'react'
import './styles.css'

function DevItem({ dev }) {
    return (
        <li className="dev_item">
            <header  >
            <img src={ dev.avatar_url} alt="JulCzar"/>
            <div className="user_info">
                <strong>{ dev.github_username }</strong>
                <span>{ dev.techs.join(', ') }</span>
            </div>
            </header>
            <p>{ dev.bio }</p>
            <a href={ `https://github.com/${dev.github_username}`}>Acessar pagina do Usuário</a>
        </li>
    )
}

export default DevItem