import React from 'react'

const LoadButton = (props) => {
  return (
    <div>
      <div className='loadMoreContainer'>
        <button className='loadMoreBtn' onClick={props.loadMore}>Load More</button>
      </div>
    </div>
  )
}

export default LoadButton;