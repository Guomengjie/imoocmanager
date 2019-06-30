import React from 'react';
import {Link,Router} from 'react-router-dom';

//HashRouter下面必须只有一个根节点
//Switch只会匹配第一个
export default class Info extends React.Component{
  render(){
    return (
        <div>
          动态路由的值是:{this.props.match.params.mainId}
        </div>
    )
  }

  componentDidMount(){
    console.log(this.props.match)
  }
}