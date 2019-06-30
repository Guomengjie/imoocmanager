import React from 'react';
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom';
import About from "../router1/About";
import Main from "../router1/Main";
import Topic from "../router1/Topic";
import Home from './Home.js'
import Info from './Info'
import NoMatch from './NoMatch'

export default class IRouter extends React.Component{
  render(){
    return(
      <Router>
        <Home>
          <Switch>
            <Route path="/main" render={()=>{
              return (
                <Main>
                  <Route path="/main/:mainId" component={Info}></Route>
                </Main>
              )
            }}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topic" component={Topic}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Home>
      </Router>
    )
  }
}