import React from 'react';
import {Row,Col} from 'antd'
import './index.less'
import Utils from './../../utils/utils.js';
import axios from '../../axios';

export default class Header extends React.Component{
    state={}
    componentDidMount(){
        this.setState({
            usename:'lsfdlld',
        })

        setInterval(()=>{
            let sysTime = Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)

        // this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city = '北京';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=2hafIbHCvVIDnYsmiGlMtwFGUMtb9G8n'
        }).then((res)=>{
            console.log(res);
        })
    }
    render(){
        const menuType = this.props.menuType
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? <Col span="6" className="logo">
                                        <img src="/assets/logo-ant.svg" alt=""/>
                                        <span>管理系统</span>
                                    </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.usename}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' : <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
						<span className="weather-detail">天气</span>
                    </Col>
                </Row>
                }
                
            </div>
        )
    }
}