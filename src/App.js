import './App.css';
import {Route, Switch} from 'react-router-dom'
import List from "./List"
import CharacterShow  from './CharacterShow';

function App() {
  return (
    <div className="App">
      <h1>Breaking Bad Characters Wiki</h1>
      <Switch>
        <Route exact path="/" render={()=><List/>} />
        <Route exact path="/character/:id" render={(routeProps)=><CharacterShow id={routeProps.match.params.id} />}/>
        <Route component ={()=><h1>Error 404! Page not found</h1>} />
      </Switch>
      
    </div>
  );
}

export default App;
