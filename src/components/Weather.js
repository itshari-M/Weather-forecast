import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

import location_img from '../asset/location.svg'
import humidity_icon from '../asset/humidity.png'
import wind_icon from '../asset/wind.png'
import sunny_icon from '../asset/clear.png'
import clouds_icon from '../asset/clouds.png'
import sca_cloud_icon from '../asset/cloud.png'
import drizzle_icon from '../asset/drizzle.png'
import rain_icon from '../asset/rain.png'
import snow_icon from '../asset/snow.png'
import shower_icon from '../asset/sun-shower.png'
import thunder_icon from '../asset/thunderstorm.png'
import mist_icon from '../asset/mist.png'

const Wheather = () => {
  const InputRef=useRef();
  const [WheatherObj,SetWheatherObj]=useState(false);
  const allicon={
    "01d":sunny_icon,
    "01n":sunny_icon,
    "02d":clouds_icon,
    "02n":clouds_icon,
    "03d":sca_cloud_icon,
    "03n":sca_cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":shower_icon,
    "09n":shower_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "11d":thunder_icon,
    "11n":thunder_icon,
    "13d":snow_icon,
    "13n":snow_icon,
    "50d":mist_icon,
    "50n":mist_icon



  }
  
  const search=async(city)=>{
    if(city===""){
      alert("Enter The City Name:");
      return;
    }
  try{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c86ed4d2c6064a36e4663b2adedb3619`;
    const response=await fetch(url);
    const data=await response.json();
    if(!response.ok){
      alert(data.message);
      return;
    }
    const icon=allicon[data.weather[0].icon] || sunny_icon;
    SetWheatherObj({
      humidity:data.main.humidity,
      speed:data.wind.speed,
      temp:Math.floor(data.main.temp),
      location:data.name,
      icon:icon
    })
    console.log(data);
    
  }
  catch(error){
    
    console.log("ERROR OCCURED!!!!")

  }
  }
  useEffect(()=>{
    search("Chennai"); 
  },[])
  
  return (
    <div className='wheather'>
    <div className='searchBox'>
    <input ref={InputRef} type='text' placeholder='Search'/>
    <img className='loc'src={location_img} alt='location_img' onClick={()=>search(InputRef.current.value)}/>
</div>
{WheatherObj?<>
  <img className='wheatherIcon' src={WheatherObj.icon} alt=''/>
    <div className='temperature'>{WheatherObj.temp}° C</div>
    <div className='location'>{WheatherObj.location}</div>
    
    <div className='wheatherData'>
    <div className='col'>
      <img src={humidity_icon} alt='hum'/>
      <div>
        <p>{WheatherObj.humidity}%</p>
        <span>Humidity</span>
      </div>

    </div>
    <div className='col'>
      <img src={wind_icon} alt='wind'/>
      <div>
        <p>{WheatherObj.speed}km/hr</p>
        <span>Wind Speed</span>
      </div>
      </div>
    </div></>
:
<></>}

    
    
  </div>
  
  )
}

export default Wheather