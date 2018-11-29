import React from 'react'
import Head from '../html/head'

export default ({ 
  children, 
  title = 'Radyolo - Twitter Streaming Radio',
  description,
}) => (
  <React.Fragment>
    <Head title={title} description={description}/>
    
    <main>
      {children}
    </main>

    <style jsx>{`
      main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
      }
    `}</style>

  </React.Fragment>
)