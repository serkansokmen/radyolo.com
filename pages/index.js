import React from 'react'
import ReactPlayer from 'react-player'
import MainLayout from '../components/layout/main'
import AppStoreButton from '../components/appstore-button'

const HomePage = ({ posts }) => (
  <MainLayout>
    <div className="home">
      <div className="branding">
        <img
          className="app-logo"
          src="/static/img/radyolo-header@2x.png"
          alt="Radyolo"
          height="40"
        />
        <a
          href="https://itunes.apple.com/us/app/radyolo/id1158542397"
          target="_blank"
        >
          <AppStoreButton width={120} height={40} />
        </a>
        <div className="links">
          <a href="mailto:hello@radyolo.com">Contact</a>|
          <a
            href="https://www.iubenda.com/privacy-policy/8101275"
            target="_blank"
          >
            Privacy & Policy
          </a>
        </div>
      </div>
      <div className="marvel-device iphone5s silver">
        <div className="top-bar" />
        <div className="sleep" />
        <div className="volume" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <ReactPlayer
            url={[
              '/static/video/radyolo-app-preview.webm',
              '/static/video/radyolo-app-preview.ogg',
              '/static/video/radyolo-app-preview.mp4',
            ]}
            playing
            width="100%"
            height="100%"
          />
        </div>
        <div className="home" />
        <div className="bottom-bar" />
      </div>
      {/* <img className="app-logo-responsive" src="/static/img/radyolo-header@2x.png" alt="Radyolo" height="40"/> */}

      <style jsx>{`
        .react-player {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
        .home {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }
        .app-logo {
          margin-bottom: 32px;
        }
        .appstore-link {
          display: inline-block;
          overflow: hidden;
          background: url(//linkmaker.itunes.apple.com/static/shared/badges/en-us/appstore-lrg.svg)
            no-repeat;
          width: 135px;
          height: 40px;
          background-size: contain;
        }
        .links {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 32px;
          padding: 8px;
          font-size: 12px;
          text-align: center;
        }
        .links > * {
          margin: 8px;
          text-decoration: none;
          color: #3c3c3c;
        }

        .branding {
          min-width: 320px;
        }
        .branding,
        .screen {
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .screen div {
          width: 100% !important;
          height: 100% !important;
        }
        video {
          width: 100%;
          height: 100%;
        }

        @media screen and (max-width: 475px) {
          .home {
            flex-direction: column-reverse;
            height: auto;
            margin-top: 0px;
            margin-bottom: 60px;
          }
          .marvel-device {
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  </MainLayout>
)

HomePage.getInitialProps = async () => {
  return {}
}

export default HomePage
