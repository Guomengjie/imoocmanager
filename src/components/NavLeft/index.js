import React from 'react';
import './index.less';
import { Menu,Icon,Button } from 'antd';
import MenuConfig from '../../config/menuConfig';
const { SubMenu } = Menu;


export default class NavLeft extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
	}

	componentDidMount(){
		console.log('componentDidMount');
		
		const menuTreeNode = this.renderMenu(MenuConfig);
		this.setState({
			menuTreeNode
		})
	}

	renderMenu = (data) => {
		return data.map((item) => {
			if(item.children){
				return (
					<SubMenu title={item.title} key={item.key}>
						{this.renderMenu(item.children)}
					</SubMenu>
				)
			}
			return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
		})
	}

	render(){
			return (
					<div>
							<div className="logo">
									<img src="/assets/logo-ant.svg" alt=""/>
									<h1>Imooc MS</h1>
							</div>
							<Menu theme="dark">
								{
										this.state.menuTreeNode
								}
							</Menu>
					</div>
			)
	}
}