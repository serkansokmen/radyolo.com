const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const Twit = require('twit')
const Twitter = new Twit({
  consumer_key:         'hwgWRDP9iCV4FfM8uU07TARDW',
  consumer_secret:      '4bYWpJ1Xqppt82q99IbNrHUF4CKOt7auznO9fxuHsnOxxdSFcF',
  access_token:         '17758455-dgAWplluzBsAx3UFlPPMOwVxX80NbkNPRnHMPmn7a',
  access_token_secret:  'fxON1tG5kXk2I614iHVzNwTmNnx77baaRq453Xmf12DZh',
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  // strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

let port = 3000

io.use((socket, next) => {
  let clientId = socket.handshake.headers['x-clientid']
  if (clientId === 'radyolo-client') {
    return next()
  }
  return next(new Error('Authentication error'))
})

let tweets = []

io.on('connection', socket => {
  console.log('connecting to io')
  const { keywords, language } = socket.handshake.query
  console.log(`...with keywords: ${keywords}`)
  let stream = Twitter.stream('statuses/filter', { track: keywords, language })

  const handleTweet = tweet => {
    let newTweets = [...tweets, tweet]
    if (newTweets.length > 100) { newTweets = newTweets.slice(0, 100) }
    tweets = newTweets
    console.log(tweet.id)
    socket.emit('tweet', {
      tweet
    })
  }
  const handleError = error => socket.emit('error', { error })

  stream.on('tweet', handleTweet)
  stream.on('error', handleError)
  
  socket.on('disconnect', () => {
    console.log('disconnecting from socket')
    stream.off('tweet', handleTweet)
    stream.off('error', handleError)
    stream.stop()
  })
})

nextApp.prepare().then(() => {
  
  app.get('/tweets', (req, res) => {
    return res.json(tweets)
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})



// const fs = require('fs')
// // Imports the Google Cloud client library
// const textToSpeech = require('@google-cloud/text-to-speech')
// // Creates a client
// const client = new textToSpeech.TextToSpeechClient()

// const setupTTS = () => {
//   // The text to synthesize
//   const text = 'Hello, world!'
//   // Construct the request
//   const request = {
//     input: {text: text},
//     // Select the language and SSML Voice Gender (optional)
//     voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
//     // Select the type of audio encoding
//     audioConfig: {audioEncoding: 'MP3'},
//   }
//   // Performs the Text-to-Speech request
//   client.synthesizeSpeech(request, (err, response) => {
//     if (err) {
//       console.error('ERROR:', err);
//       return;
//     }

//     // Write the binary audio content to a local file
//     fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
//       if (err) {
//         console.error('ERROR:', err);
//         return;
//       }
//       console.log('Audio content written to file: output.mp3');
//     });
//   })
// }
