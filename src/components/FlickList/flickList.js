import React, { Component } from 'react';
import {
  FLICK_API_REST_URL,
  SEARCH_PHOTOS_METHOD,
  GET_USER_METHOD,
  GET_IMAGE_INFO,
  API_ID,
  GET_RAW_JSON,
  PER_PAGE,
  PAGE,
  TAGS
} from  './../../config';
import Card from './../Card/card';

class FlickList extends Component {
  constructor(props){
    super();
    this.state = {
      cards: [],
    };
  }

  componentDidUpdate(oldProps) {
    console.log(oldProps.tag);
    console.log(this.props.tag);

    if(oldProps.tag !== this.props.tag) {
      this.setState({
        cards: []
      });
      this.renderFlicks(this.props.tag);
    }

  }

  loadMore(e) {
    fetch(FLICK_API_REST_URL + SEARCH_PHOTOS_METHOD + API_ID +
      TAGS + this.props.tag + PER_PAGE +'10'+ PAGE +'2' + GET_RAW_JSON)
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        let picArray = j.photos.photo.map((pic) => {

          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';

          return(
            <div>
              <div>
                <Card
                  picId={pic.id}
                  path={srcPath}
                />
              </div>
            </div>
          )
        })
        this.setState({cards: this.state.cards.concat(picArray)});
      }.bind(this))
  }

  renderFlicks(tag) {
    fetch(FLICK_API_REST_URL + SEARCH_PHOTOS_METHOD + API_ID +
      TAGS + tag + PER_PAGE +'10'+ PAGE +'1' + GET_RAW_JSON)
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        let picArray = j.photos.photo.map((pic) => {

          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';

          return(
            <div>
              <div>
                <Card
                  picId={pic.id}
                  path={srcPath}
                />
              </div>
            </div>
          )
        })
        this.setState({cards: picArray});
      }.bind(this))
  }

  componentDidMount(){
    this.renderFlicks(null);
  }

  render() {
    return (
      <div className="App">
        {this.state.cards}
        <button onClick={evt => this.loadMore(evt)}>Load More Baby</button>
      </div>
    );
  }
}

export default FlickList;