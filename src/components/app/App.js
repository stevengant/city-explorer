import React from "react";
import '../app/App.css';
import axios from 'axios';
import Weather from "../weather/Weather";
import Movies from "../movies/Movies";
import { Card, Container } from "react-bootstrap";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      cityName: '',
      lat: '',
      lon: '',
      dailyForecast: [],
      movieData: []
    }
  }

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }
  // *** DEFINE WEATHER HANDLER TO RETRIEVE DATA FROM BACKEND ***
  fetchWeather = async (cityName) => {
    try {
      // let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${cityName}`;
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${cityName.lat}&lon=${cityName.lon}`;

      let dailyForecast = await axios.get(url);
      // console.log(dailyForecast.data);
      this.setState({
        dailyForecast: dailyForecast.data
      });

    } catch (error) {
      console.log(error.message);
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      });

    }
  }
  // *** DEFINE MOVIE HANDLER TO RETRIEVE DATA FROM BACKEND ***
  fetchMovies = async (cityName) => {
    try {
      let movieUrl = `${process.env.REACT_APP_SERVER}/movie?cityName=${cityName}`;

      let movieData = await axios.get(movieUrl);
      console.log(movieData.data);
      this.setState({
        movieData: movieData.data
      });

    } catch (error) {
      console.log(error.message);
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      });

    }
  }

  getCityData = async (e) => {
    e.preventDefault();

    try {
      // DONE: need use axios to hit LocationIQ - async/await
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url)
      // console.log(cityDataFromAxios.data);

      // *** SAVE WEATHER DATA TO STATE ***
      this.setState({
        cityData: cityDataFromAxios.data[0],
        cityName: cityDataFromAxios.data[0].display_name,
        lat: cityDataFromAxios.data[0].lat,
        lon: cityDataFromAxios.data[0].lon,
        error: false,
        mapUrl: url
      });
      // console.log(cityDataFromAxios.data[0].display_name.split(',')[0]);
      this.fetchWeather(cityDataFromAxios.data[0]);
      this.fetchMovies(this.state.city);

    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <header>
          <form onSubmit={this.getCityData}>
            <label htmlFor=""> Pick a City
              <input type="text" onInput={this.handleInput} />
              <button className='myButton' type='submit'>Explore</button>
            </label>
          </form>
        </header>
        <Container className="weatherCard">
          {this.state.dailyForecast.map(forecast => {
            return (
              <Weather
                date={forecast.date}
                description={forecast.description}
              />
            )
          })}

        </Container>

        {/* Ternary - W ? T : F */}
        {

          this.state.error
            ? <Card style={{ width: '18rem' }}>
              <Card.Body>
                <h3>{this.state.errorMessage}</h3>
                <Card.Img className='error' src={"https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg"}></Card.Img>
              </Card.Body>
            </Card>
            :
            <Card style={{ width: '18rem' }}>
              {this.state.cityName && <Card.Body>
                <h3>{this.state.cityData.display_name}</h3>
                <h5>{this.state.cityData.lat} {this.state.cityData.lon}</h5>
                <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&markers=size:tiny|color:red|=${this.state.lat},${this.state.lon}&zoom=12`} alt={`Map of ${this.state.cityData.display_name}`} />
                {/* {this.state.dailyForecast && this.state.dailyForecast.map(day => <p key={day.date}>{day.date}</p>)} */}

              </Card.Body>}

            </Card>
        }
        <Container className="movieCard">
          {this.state.movieData.map(movies => {
            return (
              <Movies
                title={movies.title}
                image_url={movies.image_url}
              />
            )
          })}

        </Container>

      </>
    )
  }
}

export default App;