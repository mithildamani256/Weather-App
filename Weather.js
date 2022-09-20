import React, { Component } from 'react';
import Search from "./search";
import Result from './Result';
import axios from 'axios';
import Recent from './Recent';
class Weather extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        lat: "",
        lon: "",
        weatherData: null,
        city: "",
        isSearched: false,
      };
    }


    // componentDidMount(){
    //     const data= window.localStorage.getItem("recent");
    //     let recent = data === null ? [] : JSON.parse(data);
    //     this.setState({recent});
    //   }
      


    changeHandler = (event)=>{
        const name =event.target.name;

        if(name === "city"){
           this.setState({
               city:event.target.value
           })  
        }else if(name === "lat"){
            this.setState({
               lat: event.target.value,
            }); 
        }else if(name === "lon"){
            this.setState({
               lon: event.target.value,
            }); 
        }
    }


    locationHandler=()=>{
        this.setState({
          lat: "",
          lon: "",
          city: "",
          weatherData: null,
          isSearched: true,
          recent: [],
        });
       if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition((res)=>{

            const lat=res.coords.latitude;
            const lon =res.coords.longitude;

            
               setTimeout(() => {
                 this.setState({
                   lat: res.coords.latitude,
                   lon: res.coords.longitude,

                 });
                 axios
                .get(
                  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7d7b6c9b140d966f289835db719d8542`
                )
                .then((result) => {
                    this.setState({
                      city: result.data.name,
                      weatherData: result.data,
                    }, ()=>{
                      this.addDataToRecent();
                    });
                  
                })
                .catch((error) => {
                  console.log(error);
                });
            },500);
            
              
             
        });
    }
     else{
        console.log("Location is not Supported")
    }
}


   searchHandler=()=>{
    this.setState({
      weatherData: null,
      isSearched: true,
      
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    
 console.log(this.state.lat);
     axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=7d7b6c9b140d966f289835db719d8542`
                    )
                    .then((result) => {
                        this.setState(
                          {
                            city: result.data.name,
                            weatherData: result.data,
                          },
                          ()=>{
                            this.addDataToRecent();
                          });
                      
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                
    };

    addDataToRecent = () => {
        let recent = this.state.recent;
        recent.push({
          lat:this.state.lat,
          lon:this.state.lon,
          city:this.state.city,
        });
        this.setState({recent}, ()=>{
          window.localStorage.setItem('recent',JSON.stringify(this.state.recent));
        });
       
       };
   
       
researchHandler = (lat, lon) =>{
 this.setState({weatherData:null}, ()=>{
this.setState({ lat, lon }, () => {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=7d7b6c9b140d966f289835db719d8542`
    )
    .then((result) => {
      this.setState({
        city: result.data.name,
        weatherData: result.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
 }) ;

};





    render() {
        return (
          <>
           <Recent recent={this.state.recent} research={this.researchHandler} />
            
            <div className="container pt-4" style={{ height: "500px" }}>
           
              <Search
                lat={this.state.lat}
                lon={this.state.lon}
                city={this.state.city}
                weatherData={this.state.weatherData}
                change={this.changeHandler}
                getLocation={this.locationHandler}
                search={this.searchHandler}
              ></Search>


              <Result
              weatherData={this.state.weatherData}
              ></Result>
    
              
            </div>
          </>
        );
      }
    }
    
    export default Weather;