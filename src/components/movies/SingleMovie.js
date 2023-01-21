import React from "react";
import { Carousel } from 'react-bootstrap';

class SingleMovie extends React.Component {

  render() {
    // *** UNPACK ALL PROPS FROM CAROUSEL ***
    const {
      key,
      movie,
      title,
      ...rest
    } = this.props

    return (
      <>
        <Carousel.Item {...rest} key={this.props.key}>
          <img
            className="d-block w-100"
            src={this.props.movie.image_url ? `https://image.tmdb.org/t/p/w500${this.props.movie.image_url}` : `https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg`}
            alt={this.props.movie.title}
          />
          <Carousel.Caption>
            <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Movie Title: {this.props.movie.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </>
      // <Container>
      //   <Carousel>
      //     {carouselItems}
      //   </Carousel>
      // </Container>
    )
  }
}

export default SingleMovie;