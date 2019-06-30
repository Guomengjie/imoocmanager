import React from 'react';
import {Link} from 'react-router-dom';

//HashRouter下面必须只有一个根节点
export default class Main extends React.Component{
  render(){
    return (
      <div>
        Main
        <Link to="/main/a">嵌套路由</Link>
        <hr />
        {this.props.children}
      </div>
    )
  }
}