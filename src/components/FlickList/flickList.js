import React, { Component } from 'react';
import {
  FLICK_API_REST_URL,
  SEARCH_PHOTOS_METHOD,
  API_ID,
  GET_RAW_JSON,
  PER_PAGE,
  PAGE,
  TAGS,
  SAFE_SEARCH
} from  './../../config';
import Card from './../Card/card';
import './flickList.css';
import LoadButton from './../LoadMore/loadMore';

class FlickList extends Component {
  constructor(props){
    super();
    this.state = {
      cards: [],
      currPage: 2
    };
  }

  getDistFromBottom () {

    var scrollPosition = window.pageYOffset;
    var windowSize     = window.innerHeight;
    var bodyHeight     = document.body.offsetHeight;

    return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
  }

  componentWillMount(){
    var that = this;
    document.addEventListener('scroll', function() {
      var distToBottom = that.getDistFromBottom();

      if (distToBottom === 0) {
        that.loadMore();
      }
    });
  }

  componentDidUpdate(oldProps) {
    if(oldProps.tag !== this.props.tag) {
      this.setState({
        cards: [],
        currPage: 2,
        pollingForData: false
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
      TAGS + tag + SAFE_SEARCH + PER_PAGE +'9'+ PAGE +(page || '1') + GET_RAW_JSON)
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        let picArray = j.photos.photo.map((pic) => {

          var timestamp = new Date().getUTCMilliseconds();

          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          return(
              <div className='cardContainer' key={pic.id + timestamp}>
                <Card
                  picId={pic.id}
                  path={srcPath}
                />
              </div>
          )
        })
        if(page) {
          this.setState({
            cards: this.state.cards.concat(picArray),
          });
        } else {
          this.setState({cards: picArray});
        }
      }.bind(this)).catch(function () {
        alert("Something went wrong!")
      })
  }

  componentDidMount(){
    this.renderFlicks(null);
  }

  render() {
    return (
      <div className="flickContainer">
          {this.state.cards}
        <LoadButton loadMore={evt => this.loadMore(evt)}/>
      </div>
    );
  }
}

export default FlickList;