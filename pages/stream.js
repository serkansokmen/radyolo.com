import React from 'react'
import MainLayout from '../components/layout/main'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'
import { AutoSizer, CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry } from 'react-virtualized'
  import LazyLoad from 'react-lazyload'

import 'react-virtualized/styles.css'

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 240,
  defaultWidth: 320,
  fixedWidth: true
})

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 320,
  spacer: 20
})

class Stream extends React.Component {

  static async getInitialProps({ req }) {
    const response = await fetch(`http://localhost:3000/tweets`)
    const tweets = await response.json()
    return { initialTweets: tweets }
  }

  constructor(props) {
    super(props)

    this.state = {
      tweets: props.initialTweets,
      connected: false,
      error: '',
      keywords: [ 'amk', 'aq', 'mk' ],
      language: 'tr',
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
            'x-clientid': 'radyolo-client'
          }
        }
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
        tweets: newTweets
      }
    })
  }

  handleStreamError = (error) => {
    this.setState(() => ({ error }))
  }

  cellRenderer = ({ index, key, parent, style }) => {
    const tweet = this.state.tweets[index]
  
    return (
      <CellMeasurer
        cache={cache}
        index={index}
        key={key}
        parent={parent}
      >
        <div style={style}>
          <div className="cell-container">
            <h3>
              <LazyLoad height={32}>
                <img src={tweet.user.profile_image_url_https} style={{ width: 32, height: 32 }}/>
              </LazyLoad>
              {tweet.user.screen_name}
            </h3>
            <p>{tweet.text}</p>
            {tweet.user.location && <p><span><i className="fas fa-map-marker"></i> {tweet.user.location}</span></p>}
          </div>
        </div>
        <style jsx>{`
        .cell-container {
          padding: 0.2rem 1.2rem;
          box-shadow: 0px 5px 12px -6px rgba(0,0,0,0.75);
          border-radius: 8px;
          background-color: #f1f1f1;
          border: 2px solid white;
        }
        `}</style>
      </CellMeasurer>
    )
  }

  render() {

    const { keywords, tweets, connected, error } = this.state
    
    return (
      <MainLayout>
        <div className="container">
          <h1>{JSON.stringify(keywords, null, 2)} <small>({tweets.length})</small></h1>
          {/* <p><strong>{connected ? 'connected' : 'disconnected'}</strong></p> */}

          <button onClick={(e) => {
            connected ? this.disconnectFromStream() : this.connectToStream()
          }}>{connected ? 'Stop' : 'Stream'}</button>
          
          <div className="tweets">
            <AutoSizer>
              {({ height, width }) => (
                <Masonry
                  cellCount={tweets.length}
                  cellMeasurerCache={cache}
                  cellPositioner={cellPositioner}
                  cellRenderer={this.cellRenderer}
                  height={height}
                  width={width}/>
              )}
            </AutoSizer>
          </div>
          
          {error.message && <div>{error.message}</div>}
          
          <style jsx>{`
          .container {
            width: 90%;
            height: 60%;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-direction: column;
          }
          .tweets {
            flex: 1 0 auto;
            width: 100%;
            height: 100%;
          }
          h1 {
            font-size: 1.6rem;
          }
          h2 {
            font-size: 1.45rem;
          }
          h3 {
            font-size: 1.3rem;
          }
          p {
            font-size: 1.2rem;
          }
          `}</style>
        </div>
      </MainLayout>
    )
  }
}

export default Stream