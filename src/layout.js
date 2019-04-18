import React, { Component } from 'react';
import FlickList from './components/FlickList/flickList'

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      sTag:       ''
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  startSearch(evt) {
    this.setState({
      sTag: this.state.inputValue
    });
  }

  render() {
    return (
      <div>
          <div className="searchBar">
            <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            <div onClick={(evt) => this.startSearch(evt)}></div>
          </div>
        <FlickList tag={this.state.sTag || null}/>
      </div>
    );
  }

}

export default Layout;