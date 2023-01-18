import React from 'react';
import Card from 'react-bootstrap/Card';
// import './src/components/weather/Weather';

class Weather extends React.Component {

  render() {
    return(
      <>
        <Card>
          <Card.Body>
            <Card.Title>{this.props.date}</Card.Title>
            <Card.Text>
              {this.props.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Weather;