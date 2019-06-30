import React from 'react';
import {Link,Router} from 'react-router-dom';

//HashRouter下面必须只有一个根节点
//Switch只会匹配第一个
export default class NoMatch extends React.Component{
  render(){
    return (
        <div>
          404 没有此页面
        </div>
    )
  }
}