import React from 'react'
import Head from '../html/head'

const Layout = ({ 
  children, 
  title = 'Radyolo - Twitter Streaming Radio',
  description,
}) => (
  <>
    <Head title={title} description={description}/>
    
    <main>
      {children}
    </main>

    <style jsx global>{`
      html {
        font-size: 16px;
      }
      
      @media screen and (min-width: 320px) {
        html {
          font-size: calc(16px + 6 * ((100vw - 320px) / 680));
        }
      }
      
      @media screen and (min-width: 1000px) {
        html {
          font-size: 22px;
        }
      }
      
      body {
        margin: 0;
        padding: 0;
        font-family: 'Lato', sans-serif;
        /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
        font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
      }
      
      a {
        text-decoration: none;
        color: #458B7C;
      }
    
      main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
      }
    `}</style>

  </>
)

export default Layout