import React, { Component } from 'react';
import {
  FLICK_API_REST_URL,
  SEARCH_PHOTOS_METHOD,
  API_ID,
  GET_RAW_JSON,
  PER_PAGE,
  PAGE,
  TAGS
} from  './../../config';
import Card from './../Card/card';
import './flickList.css'

class FlickList extends Component {
  constructor(props){
    super();
    this.state = {
      cards: [],
      currPage: 2
    };
  }

  componentDidUpdate(oldProps) {
    if(oldProps.tag !== this.props.tag) {
      this.setState({
        cards: [],
        currPage: 2
      });
      this.renderFlicks(this.props.tag);
    }
  }

  incrementCurrentPage(){
    this.setState({
      currPage: this.state.currPage + 1
    })
  }

  loadMore(e) {
    this.incrementCurrentPage();
    this.renderFlicks(this.props.tag, this.state.currPage);
  }

  renderFlicks(tag, page) {
    fetch(FLICK_API_REST_URL + SEARCH_PHOTOS_METHOD + API_ID +
      TAGS + tag + PER_PAGE +'9'+ PAGE +(page || '1') + GET_RAW_JSON)
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        let pages = j.photos.pages;
        let picArray = j.photos.photo.map((pic) => {

          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';

          return(
              <div className='cardContainer'>
                <Card
                  picId={pic.id}
                  path={srcPath}
                />
              </div>
          )
        })
        if(page) {
          this.setState({cards: this.state.cards.concat(picArray)});
        } else {
          this.setState({cards: picArray});
        }
      }.bind(this))
  }

  componentDidMount(){
    this.renderFlicks(null);
  }

  render() {
    return (
      <div className="flickContainer">
        {this.state.cards}
        <div>
          <button onClick={evt => this.loadMore(evt)}>Load More</button>
        </div>
      </div>
    );
  }
}

export default FlickList;