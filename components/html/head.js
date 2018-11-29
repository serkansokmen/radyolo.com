import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultTitle = 'Radyolo - Twitter Streaming Radio'
const defaultDescription = 'Radyolo makes it easy to listen to fine-tuned Twitter streams in real time.'
const defaultKeywords = 'social, streaming, live, listen, tweets, location, trending, trends, twitter, radio, real time'
const defaultOGURL = 'https://radyolo.com'
const defaultOGImage = './static/img/radyolo-meta.jpg'

const Head = props => (
  <div>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || defaultTitle}</title>
      <meta
        name="description"
        content={props.description || defaultDescription}
      />
      <meta name="keywords" content={props.keywords || defaultKeywords}/>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="./static/img/favicon.ico" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || defaultTitle} />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
      <meta property="fb:app_id" content="1691102717860793" />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta name="twitter:image:alt" content={props.title || defaultTitle} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <link rel="apple-touch-icon" sizes="57x57" href="./static/img/apple-touch-icon-57x57.png"/>
      <link rel="apple-touch-icon" sizes="60x60" href="./static/img/apple-touch-icon-60x60.png"/>
      <link rel="apple-touch-icon" sizes="72x72" href="./static/img/apple-touch-icon-72x72.png"/>
      <link rel="apple-touch-icon" sizes="76x76" href="./static/img/apple-touch-icon-76x76.png"/>
      <link rel="apple-touch-icon" sizes="114x114" href="./static/img/apple-touch-icon-114x114.png"/>
      <link rel="apple-touch-icon" sizes="120x120" href="./static/img/apple-touch-icon-120x120.png"/>
      <link rel="apple-touch-icon" sizes="144x144" href="./static/img/apple-touch-icon-144x144.png"/>
      <link rel="apple-touch-icon" sizes="152x152" href="./static/img/apple-touch-icon-152x152.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="./static/img/apple-touch-icon-180x180.png"/>
      {/* <link rel="icon" type="image/png" sizes="192x192"  href="./static/img/android-icon-192x192.png"/> */}
      <link rel="icon" type="image/png" sizes="32x32" href="./static/img/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="96x96" href="./static/img/favicon-96x96.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="./static/img/favicon-16x16.png"/>
      {/* <link rel="manifest" href="./static/img/manifest.json"/> */}
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="msapplication-TileImage" content="./static/img/mstile-144x144.png" />
      <meta name="msapplication-square70x70logo" content="./static/img/mstile-70x70.png" />
      <meta name="msapplication-square150x150logo" content="./static/img/mstile-150x150.png" />
      <meta name="msapplication-wide310x150logo" content="./static/img/mstile-310x150.png" />
      <meta name="msapplication-square310x310logo" content="./static/img/mstile-310x310.png" />
      <meta name="theme-color" content="#ffffff"/>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
      <link href="./static/css/devices.min.css" rel="stylesheet" />

    </NextHead>
    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
      }
      * {
        font-family: 'Roboto', sans-serif;
      }
      a {
        text-decoration: none;
        color: #458B7C;
      }
    `}</style>
  </div>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
