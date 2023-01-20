import React from 'react';
// import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {

  render() {
    return (
      <>
        {this.props.weather.map(forecast => {
          return (
            <WeatherDay
              date={forecast.date}
              description={forecast.description}
            />
          )
        })}
      </>
    )
  }
}

export default Weather;