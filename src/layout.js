import React, { Component } from 'react';
import FlickList from './components/FlickList/flickList'
import Search from './components/Search/search'

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

  startSearch() {
    this.setState({
      sTag: this.state.inputValue
    });
  }

  render() {
    return (
      <div>
        <Search inputValue={this.state.inputValue}
                updateInputValue={(evt)=> this.updateInputValue(evt)}
                startSearch={() => this.startSearch()}/>
        <FlickList tag={this.state.sTag || null}/>
      </div>
    );
  }

}

export default Layout;