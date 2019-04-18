import React, { Component } from 'react';
import './card.css';
import {
  FLICK_API_REST_URL,
  GET_IMAGE_INFO,
  API_ID,
  GET_RAW_JSON
} from  './../../config';
const profileUrl = 'https://www.flickr.com/photos/';

class Card extends Component {
  constructor (props) {
    super(props);

    this.state = {
      photoTitle:  '',
      photoLink:   '',
      photoPrev:   '',
      author:      '',
      authorLink:  '',
      description: '',
      tags:        []
    };
  }

  componentDidMount() {
    fetch(FLICK_API_REST_URL + GET_IMAGE_INFO + API_ID + '&photo_id=' + this.props.picId + GET_RAW_JSON)
      .then(function (response) {
        return response.json();
      })
      .then(function (photoDetails) {

        var tagsarr = photoDetails.photo.tags.tag.map((tag) => {
          return(
            <span key={tag.id}>#{tag.raw}, </span>
          )
        })
        this.setState({
          photoTitle: photoDetails.photo.title._content,
          photoLink:  photoDetails.photo.urls.url[0]._content,
          author:     photoDetails.photo.owner.username,
          authorLink: profileUrl + photoDetails.photo.owner.nsid + '/',
          photoPrev:  this.props.path,
          description: photoDetails.photo.description._content,
          tags: tagsarr
        })
      }.bind(this))
      .catch(function(err){
        alert(err);
      })
  }

  render() {
    return (
      <div className="card">
        <div className='img'>
          <img src={this.state.photoPrev} alt={this.state.photoTitle}/>
        </div>
        <div className='links'>
          <a className='photoLink' href={this.state.photoLink} target='_blank' title={this.state.photoTitle}>Photo Link</a>
          <a className='authorLink' href={this.state.authorLink} target='_blank' title={this.state.author}>Author link </a>
        </div>
        <div className='cardTextContainer'>
          <div className="descriptionContainer"><span className='description'>Description: </span>{this.state.description }</div>
          <div>
            <span className='tag'>Tags: </span>
            {this.state.tags}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;