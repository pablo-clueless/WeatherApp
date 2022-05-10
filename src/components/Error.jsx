import React from 'react'
import Header from './Header'
import { FiXOctagon } from 'react-icons/fi'

const Error = ({error}) => {
    return (
        <>
         <Header />
        <main>
        <div className="error">
          <i><FiXOctagon /></i>
          <p>Error: <span>{error}</span></p>
          <button onClick={() => {
            window.location.reload()
          }}>Refresh</button>
        </div>
      </main>
        </>
    )
}

export default Error
