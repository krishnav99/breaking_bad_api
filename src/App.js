import './App.css';
import {Route, Switch} from 'react-router-dom'
import List from "./Components/List"
import CharacterShow  from './Components/CharacterShow';

function App() {
  return (
    <div className="App">
      <nav>
        <img src="/breaking-bad.png" alt="breaking-bad" width="50" height="50"/>
        <h1>Breaking Bad Characters Wiki</h1>
      </nav>
      <br/>
      <Switch>
        <Route exact path="/" render={()=><List/>} />
        <Route exact path="/character/:id" render={(routeProps)=><CharacterShow id={routeProps.match.params.id} />}/>
        <Route component ={()=><h1>Error 404! Page not found</h1>} />
      </Switch>
      
    </div>
  );
}

export default App;
