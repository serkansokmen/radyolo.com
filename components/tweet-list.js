import React from 'react'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized'
import LazyLoad from 'react-lazyload'

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 240,
  defaultWidth: 320,
  fixedWidth: true,
})

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 320,
  spacer: 20,
})

export default ({ tweets }) => {
  const cellRenderer = ({ index, key, parent, style }) => {
    const tweet = tweets[index]

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <h3>
            <LazyLoad height={32}>
              <img
                src={tweet.user.profile_image_url_https}
                style={{ width: 32, height: 32 }}
              />
            </LazyLoad>
            {tweet.user.screen_name}
          </h3>
          <p>{tweet.text}</p>
          {tweet.user.location && (
            <p>
              <span className="fas fa-map-marker" /> {tweet.user.location}
            </p>
          )}
        </div>
        <style jsx>{`
          h3,
          p {
            margin: 0;
          }
        `}</style>
      </CellMeasurer>
    )
  }

  return (
    <div className="tweets">
      <AutoSizer>
        {({ height, width }) => (
          <Masonry
            cellCount={tweets.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={height || 320}
            width={width || 320}
          />
        )}
      </AutoSizer>

      <style jsx scoped>{`
        .tweets {
          flex: 1 1 auto;
          display: block;
          width: 100%;
          height: auto;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  )
}
