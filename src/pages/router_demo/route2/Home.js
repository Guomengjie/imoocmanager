import React from 'react';
import {Link,Router} from 'react-router-dom';

//HashRouter下面必须只有一个根节点
//Switch只会匹配第一个
export default class Home extends React.Component{
  render(){
    return (
        <div>
          <ul>
            <li>
              <Link to="/main">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topic">topic</Link>
            </li>
          </ul>
          {this.props.children}
        </div>
    )
  }
}