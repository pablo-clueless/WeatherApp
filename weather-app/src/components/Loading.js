import React from 'react'
import '../css/Loading.css'
import Header from './Header'

const Loading = () => {
    return (
       <>
       <Header />
        <main>
           <div className="wrapper">
               <div className="blob-1"></div>
               <div className="blob-2"></div>
           </div>
        </main>
       </>
    )
}

export default Loading
