import React from "react";
import './App.css';
import axios from 'axios';
import { Card } from "react-bootstrap";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      cityName: ''
    }
  }

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();

    try {
      // DONE: need use axios to hit LocationIQ - async/await
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      console.log(url);

      let cityDataFromAxios = await axios.get(url)
      console.log('display name', cityDataFromAxios.data[0].display_name);
      console.log('latitude', cityDataFromAxios.data[0].lat);
      console.log('longitude', cityDataFromAxios.data[0].lon);

      this.setState({
        cityData: cityDataFromAxios.data[0],
        cityName: cityDataFromAxios.data[0].display_name,
        latitude: cityDataFromAxios.data[0].latitude,
        longitude: cityDataFromAxios.data[0].longitude,
        error: false
      })

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

        <form onSubmit={this.getCityData}>
          <label htmlFor=""> Pick a City
            <input type="text" onInput={this.handleInput} />
            <button type='submit'>Explore</button>
          </label>

        </form>

        {/* Ternary - W ? T : F */}
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            :
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <h3>{this.state.cityData.display_name}</h3>
                <h5>{this.state.cityData.lat} {this.state.cityData.lon}</h5>
                <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&markers=size:tiny|color:red=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`} alt={`Map of ${this.state.cityData.display_name}`} />
              </Card.Body>
            </Card>
        }


      </>
    )
  }
}

export default App;