const blockstack = require('blockstack')
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png'

export default class BLockstackService {
  constructor(domain) {
    this.domain = domain
  }

  async login(username, password) {
    const token = await this.fetch(`${this.domain}/account/login`, {
      Grant_Type: 'password',
      username,
      password,
    })
    this.setToken(token.access_token)

    const me = this.fetch(`${this.apiDomain}/api/member/me`)
    const balance = this.fetch(
      `${this.apiDomain}/api/transaction/MemberBalanceTotal`,
      {}
    )
    const results = await Promise.all([me, balance])

    if (results[0].IsSuccess && results[1].IsSuccess) {
      const profile = {
        ...results[0].Result,
        Balance: results[1].Result,
      }
      this.setProfile(profile)

      return Promise.resolve(profile)
    } else {
      return Promise.reject({
        errors: [...results[0].Errors, ...results[1].Errors],
      })
    }
  }

  register(username, email, password) {
    // Get a token
    return this.fetch(`${this.domain}/account/register`, {
      username,
      password,
      mailaddress: email,
    })
      .then(res => {
        this.setToken(res.access_token)
        return this.fetch(`${this.apiDomain}/api/member/me`)
      })
      .then(res => {
        if (res.IsSuccess) {
          this.setProfile(res.Result)

          return Promise.resolve(res)
        } else {
          return Promise.reject(res.Errors[0])
        }
      })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token
    //&& !this.isTokenExpired(token) // handwaiving here
  }

  // isTokenExpired(token) {
  //   return false
  // }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : null
  }

  async getNotifications(profile) {
    if (!profile) {
      return await Promise.resolve([])
    }
    return await this.fetch(
      `${this.apiDomain}/api/member/getmembernotifications`,
      {
        PageIndex: 1,
        PageSize: 5,
        MemberId: profile.UserId,
      }
    ).then(res => {
      if (res.IsSuccess) {
        return Promise.resolve(res.Result.Items)
      } else {
        return Promise.resolve([])
      }
    })
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }

  _checkStatus(response) {
    // return new Promise((resolve, reject) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
    // })
  }

  fetch(url, body) {
    // performs api calls sending the required authentication  9headers
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    }

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      method: 'POST',
      headers,
      body: !!body ? qs.stringify(body) : null,
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }
}
