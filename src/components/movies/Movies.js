import React from 'react';
import { Carousel } from 'react-bootstrap';

class Movies extends React.Component {


  render() {

    return (
      <>
        {/* <Carousel>     */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={this.props.image_url}
              alt={this.props.title}
            />
            <Carousel.Caption>
              <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Movie Title: {this.props.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        {/* </Carousel> */}
      </>
    )
  }
}

export default Movies;