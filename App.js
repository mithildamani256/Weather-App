import Home from './Home';
import Weather from './Weather';
import Header from './Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
   <>
   <div className="container-fluid p-0">
   <Router>
   <Header/>
      <Routes>
       
          <Route path="/" element={<Home/>}>
        
          </Route>
          
          <Route path="/weather" element={<Weather/>}>
        
          </Route>
          
           
         
           
          
  
          </Routes>
    </Router>
    </div>
   </>
  );
}

export default App;
