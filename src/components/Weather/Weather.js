import React from 'react'
import './Weather.css'

const Weather = props => (
        <div>
            {
             props.state.city
                ? <div>
                    <p>Местоположение: {props.state.city}, {props.state.country} </p>
                    <p>Температура: {props.state.temp} °C	 </p>
                    <p>Давление: {props.state.pressure} мм. рт. столба </p>
                    <p>Заход солнца: {props.state.sunset} </p>
                  </div>
                : <div className='error'> { props.state.error } </div>
            }
        </div>
    )    

export default Weather