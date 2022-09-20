import React from 'react';


function Result(props) {
    const { weatherData: data } = props;
    function kToc(k){
        return (k - 273.15).toFixed(2) + "° C";
    }
    function getTheDate(stamp){
        const date =new Date(stamp*1000);
        return date.toLocaleTimeString();
    }
 let showOnPage;
    if(data == null){
      if(props.isSearched === true){
       showOnPage = "";
       } else{ 
      showOnPage=
      (<div className='container-fluid'>
        <h1 className='text-center mt-2'>Please search a city </h1>

      </div>)
      }
    }
    else{
 showOnPage = 
 <div className="row">
     <div className="col">
        <div className="card border-primary">
          <div className="card-body">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
            />
            <h4 className="card-title">
              {data.name} ({kToc(data.main.temp)}){" "}
              <span className="pl-2">{data.weather[0].description}</span>
            </h4>
            <div className="row">
              <div className="col">
                <div className="row">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Feels like</th>
                        <td>{kToc(data.main.feels_like)}</td>
                      </tr>
                      <tr>
                        <th>Min Temp.</th>
                        <td>{kToc(data.main.temp_min)}</td>
                      </tr>
                      <tr>
                        <th>Max Temp.</th>
                        <td>{kToc(data.main.temp_max)}</td>
                      </tr>
                      <tr>
                        <th>Sun Rise</th>
                        <td>{getTheDate(data.sys.sunrise)}</td>
                      </tr>
                      <tr>
                        <th>Sun Set</th>
                        <td>{getTheDate(data.sys.sunset)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  return (

   <> 
     {showOnPage }
    </>
  );
}
export default Result;


