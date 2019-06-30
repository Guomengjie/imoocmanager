import React from 'react';
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom';
import About from "../router1/About";
import Main from "../router1/Main";
import Topic from "../router1/Topic";
import Home from './Home.js'

export default class IRouter extends React.Component{
  render(){
    return(
      <Router>
        <Home>
          <Route path="/main" render={()=>{
            return (
              <Main>
                <Route path="/main/a" component={About}></Route>
              </Main>
            )
          }}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topic" component={Topic}></Route>
        </Home>
      </Router>
    )
  }
}