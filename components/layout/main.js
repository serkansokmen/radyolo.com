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

    <style jsx global>{`
      :global(body) {
        margin: 0;
        padding: 0;
      }
      * {
        font-family: 'Roboto', sans-serif;
      }
      :global(a) {
        text-decoration: none;
        color: #458B7C;
      }
      main {
        max-width: 960px;
        margin: 0 auto;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
      }
    `}</style>
  </React.Fragment>
)