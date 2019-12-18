import React from 'react'
import './App.css'
import Info from './components/Info/Info'
import Weather from './components/Weather/Weather'
import Form from './components/Form/Form'


const API_KEY = '69fb0fb8389e95d49a251c1f44bfd691'


class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
    
  }

  gettingWeather = async (event) => {
    event.preventDefault()
    const city = event.target.elements.city.value
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await api_url.json()
    console.log(data)
        
    if(!data.name){
          this.setState({
            temp: undefined,
            city: undefined,
            country: undefined,
            pressure: undefined,
            sunset: undefined,
            error: data.message, 
          });
          
    } else if (city) {
    
      const sunset = data.sys.sunset
      const date = new Date()
      date.setTime(sunset*1000)
      const sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

      this.setState({
        temp: data.main.temp.toFixed(1),
        city: data.name,
        country: data.sys.country,
        pressure: Math.trunc(data.main.pressure * 0.750062),
        sunset: sunset_date,
        error: undefined
      })

    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: 'Введите название города'
      })
  }
}

  render() {
    return (
      <div className='wrapper'>
        <div className='main'>
          <div className='info'>
            <Info />
          </div>
          <div className='form'>
            <Form
              getWeather = {this.gettingWeather}
            />
                
            <Weather 
              state = {this.state}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App