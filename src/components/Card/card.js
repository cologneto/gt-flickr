import React, { Component } from 'react';
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

  componentWillMount(props) {
    console.log(props);
    fetch(FLICK_API_REST_URL + GET_IMAGE_INFO + API_ID + '&photo_id=' + this.props.picId + GET_RAW_JSON)
      .then(function (response) {
        return response.json();
      })
      .then(function (photoDetails) {

        var tagsarr = photoDetails.photo.tags.tag.map((tag) => {
          return(
            <span>#{tag.raw},</span>
          )
        })
        this.setState({
          photoTitle: photoDetails.photo.title._content,
          photoLink:  photoDetails.photo.urls.url[0]._content,
          author:     photoDetails.photo.owner.username,
          authorLink: profileUrl + photoDetails.photo.owner.nsid + '/',
          photoPrev:  this.props.path,
          description: 'Description: ' + photoDetails.photo.description._content,
          tags: tagsarr
        })
      }.bind(this))
  }

  render() {
    return (
      <div className="card">
        <div className='img'>
          <img src={this.state.photoPrev} alt={this.state.photoTitle}/>
        </div>
        <div className='links'>
          <a href={this.state.photoLink} target='_blank'>{this.state.photoTitle}</a>
          <a href={this.state.authorLink} target='_blank'>{this.state.author}</a>
        </div>
        <div>
          <div>{this.state.description }</div>
          <div>
            {this.state.tags}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;