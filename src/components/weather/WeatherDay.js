import React from "react";
import Card from "react-bootstrap/Card";

class WeatherDay extends React.Component {
  render() {
    return(
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Title>{this.props.date}</Card.Title>
          <Card.Body>
            <Card.Subtitle>{this.props.description}</Card.Subtitle>

          </Card.Body>
        </Card>
      </>
    );
  }    
}

export default WeatherDay;