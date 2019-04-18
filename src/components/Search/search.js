import React from 'react';

const Search = (props) => {
  return (
    <div className='searchBarContainer'>
      <div className="searchBar">
        <input value={props.inputValue} PLACEHOLDER='Search' onChange={(evt) => props.updateInputValue(evt)}/>
        <div onClick={() => props.startSearch()}></div>
      </div>
    </div>

  )
}

export default Search;
