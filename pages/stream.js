import React from 'react'
import MainLayout from '../components/layout/main'
import fetch from 'isomorphic-fetch'
import AuthConsumer, { AuthProvider } from '../components/context/auth-context'
import 'react-virtualized/styles.css'
import TwitterStream from '../components/twitter-stream'

class Stream extends React.Component {
  
  state = {
    user: {
      name() {
        return 'Anonymous'
      },
      avatarUrl() {
        return 'https://s3.amazonaws.com/onename/avatar-placeholder.png'
      }
    },
    isAuthenticated: null,
  }

  static async getInitialProps({ req }) {
    const response = await fetch(`http://localhost:3000/tweets`)
    const tweets = await response.json()
    return { 
      initialTweets: tweets,
      keywords: [ 'amk', 'aq', 'mk' ],
      language: 'tr',
    }
  }

  render() {

    const { initialTweets, keywords, language } = this.props
    
    return (
      <MainLayout>
        <AuthProvider>
          <AuthConsumer>{({ user, isLoading, isAuthenticated, onSignIn, onSignOut }) => (
            <div className="container">
                {isLoading ? <div>Loading...</div> : (
                  <>
                    <div className="profile">
                      {isAuthenticated && user &&
                      <div className="row">
                        <img src={user.avatarUrl()}/>
                        <div className="username">{user.name()}</div>
                        <button onClick={onSignOut}>Sign Out</button>
                      </div>}
                      {!isAuthenticated && <div className="row"><button onClick={onSignIn}>Sign In</button></div>}
                    </div>
                    <div className="row">
                      <TwitterStream initialTweets={initialTweets} keywords={keywords} language={language}/>
                    </div>
                  </>
                )}
            </div>
          )}</AuthConsumer>
        </AuthProvider>
          
        <style jsx scoped>{`
        .container {
          width: 90%;
          min-height: 70%;
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          flex-direction: column;
          margin: 0 auto;
        }
        .profile {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-direction: row;
          font-size: 0.75rem;
          margin-bottom: 1.2rem;
        }
        .profile img {
          height: 45px;
          border-radius: 50%;
          flex: 0 1 45px;
        }
        .profile .username {
          margin-right: 0.8rem;
          margin-left: 0.8rem;
          flex: 2 1 auto;
        }
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          width: 100%;
          height: 100%;
        }
        .row .grow {
          flex: 2 1 auto;
          margin: 0.8rem;
        }
        @media screen and (min-width: 320px) {
          .container {
            width: 70%;
            min-height: 70%;
          }
        }
        
        @media screen and (min-width: 1000px) {
          .container {
            width: 80%;
            min-height: 50%;
          }
        }

        *:focus {
          outline: none;
        }
        `}</style>
      </MainLayout>
    )
  }
}

export default Stream