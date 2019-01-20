import React from 'react'
import io from 'socket.io-client'
import TweetList from './tweet-list'

class TwitterStream extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tweets: props.initialTweets || [],
      connected: false,
      error: '',
      keywords: props.keywords, // [ 'amk', 'aq', 'mk' ],
      language: props.language, // 'tr',
    }
  }

  componentDidMount() {
    this.socket = io({
      query: {
        keywords: this.state.keywords,
        language: this.state.language,
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-clientid': 'radyolo-client',
          },
        },
      },
      autoConnect: false,
    })

    this.socket.on('connect', this.handleConnect)
    this.socket.on('disconnect', this.handleDisconnect)
    this.socket.on('tweet', this.handleStreamStatus)
    this.socket.on('error', this.handleStreamError)
  }

  componentWillUnmount() {
    this.socket.off('connect', this.handleConnect)
    this.socket.off('disconnect', this.handleDisconnect)
    this.socket.off('tweet', this.handleStreamStatus)
    this.socket.off('error', this.handleStreamError)
    this.socket.close()
  }

  connectToStream = () => {
    this.socket.open()
  }

  disconnectFromStream = () => {
    this.socket.close()
  }

  handleConnect = () => {
    this.setState({ connected: true })
  }

  handleDisconnect = () => {
    this.setState({ connected: false })
  }

  handleStreamStatus = ({ tweet }) => {
    this.setState(prevState => {
      let newTweets = [tweet, ...prevState.tweets]
      if (newTweets.length > 100) {
        newTweets.slice(0, 100)
      }
      return {
        tweets: newTweets,
      }
    })
  }

  handleStreamError = error => {
    this.setState(() => ({ error }))
  }

  render() {
    const { keywords, tweets, connected, error } = this.state

    return (
      <div className="container">
        <div className="row">
          <button
            className={connected ? 'toggle-btn active' : 'toggle-btn'}
            onClick={e => {
              connected ? this.disconnectFromStream() : this.connectToStream()
            }}
          >
            {connected ? (
              <span className="fas fa-pause" />
            ) : (
              <span className="fas fa-play" />
            )}
          </button>
          <div className="grow">
            <h1>
              {JSON.stringify(keywords, null, 2)}{' '}
              <small>({tweets.length})</small>
            </h1>
          </div>
          {connected && (
            <img className="connected-anim" src="/static/img/BLAHani.gif" />
          )}
        </div>

        <TweetList tweets={tweets} />

        {error.message && <div>{error.message}</div>}

        <style jsx scoped>{`
          .container {
            width: 100%;
            height: 100%;
            display: block;
          }
          .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
          }
          .row .grow {
            flex: 2 1 auto;
            margin: 0.8rem;
          }
          .row .grow h1 {
            font-size: 1.6rem;
            margin: 0;
            padding: 0;
          }
          .toggle-btn {
            padding: 1.2rem;
            border: 1px solid transparent;
            background: #c3c3c3;
            display: inline-block;
            border-radius: 6px;
            transition: all 0.4s ease;
            color: white;
            cursor: pointer;
            flex: 0 1 auto;
          }
          .toggle-btn.active {
            border: 1px solid #47b9e6;
            background: #f1f0f0;
          }
          .toggle-btn span.fas {
            font-size: 1.6rem;
            vertical-align: middle;
            // transform: translateY(-50%);
          }
          .connected-anim {
            height: 72px;
          }
        `}</style>
      </div>
    )
  }
}

export default TwitterStream
