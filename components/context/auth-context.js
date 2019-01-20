import React, { createContext } from 'react'

const blockstack = require('blockstack')

const AuthContext = createContext({
  user: {
    name() {
      return 'Anonymous'
    },
    avatarUrl() {
      return 'https://s3.amazonaws.com/onename/avatar-placeholder.png'
    }
  },
  isAuthenticated: null,
  onSignIn: () => {},
  onSignOut: () => {},
})

export default AuthContext.Consumer

export class AuthProvider extends React.Component {

  state = {
    user: null,
    isAuthenticated: null,
    isLoading: false,
  }

  componentWillMount() {
    this.setState({ isLoading: true })
  }

  componentDidMount() {
    this.checkAuthentication()
  }

  async checkAuthentication() {
    if (blockstack.isUserSignedIn()) {
      const { profile } = blockstack.loadUserData()
      this.setState(() => ({
        user: new blockstack.Person(profile),
        isAuthenticated: true,
        isLoading: false,
      }))
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
        .then(({ profile }) => this.setState(() => ({
          user: new blockstack.Person(profile),
          isAuthenticated: true,
          isLoading: false,
        })))
    } else {
      this.setState(() => ({ isAuthenticated: false, isLoading: false }))
    }
  }

  render() {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        onSignIn: () => {
          const { origin, pathname } = window.location
          const prod = process.env.NODE_ENV === 'production'
          blockstack.redirectToSignIn(origin + pathname, `${origin}/static/manifest${!prod && '.dev'}.json`, ['store_write', 'publish_data'])
        },
        onSignOut: () => {
          const { origin, pathname } = window.location
          blockstack.signUserOut(origin + pathname)
        }
      }}>{this.props.children}</AuthContext.Provider>
    )
  }
}
