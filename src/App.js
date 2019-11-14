import React, { Component } from "react";
import { BrowserRouter, Route,Switch,HashRouter} from "react-router-dom";
import Login from "./components/Login";
import Chart from "./components/Chart";
import Detail from "./components/Detail";
import Found from "./components/Found";

const NewRoute = () => {

  return(
    <div>

      <p> this is new</p>
    </div>
  );
}

class App extends Component {

  render() {

    return (
         <HashRouter>
            <Switch>
		   
        <Route exact path="/Detail" component={ Detail } />
        <Route exact path="/Login" component={ Login } />
        <Route exact path="/Chart" component={ Chart } />
        <Route exact path="/Found" component={ Found } />
	         </Switch>
           </HashRouter>
    );
  }
}

export default App;
