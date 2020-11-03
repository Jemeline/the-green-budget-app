import React , { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import { BrowserRouter} from 'react-router-dom'
import Routes from './routes/routes'

class App extends Component {
  componentDidMount() {
    document.title = "Green Financing";
  }
  render() {
      return (
        <div className="App">
          <BrowserRouter>
            <div> 
              <Routes/>
            </div>
          </BrowserRouter>
        </div>
      )};
}

export default App;