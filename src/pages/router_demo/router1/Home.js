import React from 'react';
import {HashRouter,Route,Link,Switch} from 'react-router-dom';
import About from "./About";
import Main from "./Main";
import Topic from "./Topic";

//HashRouter下面必须只有一个根节点
//Switch只会匹配第一个
export default class Home extends React.Component{
  render(){
    return (
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topic">topic</Link>
            </li>
          </ul>
          <Route path="/" component={Main}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topic" component={Topic}></Route>
        </div>
      </HashRouter>
    )
  }
}