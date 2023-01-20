import React from 'react';
import {Carousel} from 'react-bootstrap';
import SingleMovie from './SingleMovie.js';

class Movies extends React.Component {


  render() {

    return (
      <Carousel>
      {
        this.props.movieData.map((elem, index) => (
          <SingleMovie key={index} movie={elem} />
        ))
      }
    </Carousel>

    )
  }
}

export default Movies;