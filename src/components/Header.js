import React from 'react'
import { FiTwitter, FiGithub, FiGlobe } from 'react-icons/fi'

const Header = () => {
    return (
        <header>
            <h1>Weather App</h1>
            <ul>
                <li>
                    <a href="https://github.com/pablo-clueless" rel='noopener noreferrer' target='_blank'>
                        <FiGithub />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/pablo_clueless" rel='noopener noreferrer' target='_blank'>
                        <FiTwitter />
                    </a>
                </li>
                <li>
                    <a href="https://okunolasamson.netlify.app" rel='noopener noreferrer' target='_blank'>
                        <FiGlobe />
                    </a>
                </li>
            </ul>
        </header>
    )
}

export default Header
