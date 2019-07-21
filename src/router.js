import React from 'react'
import { HashRouter,Route,Link } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Button from './pages/ui/button'
import Admin from './Admin'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import City from './pages/city'
import Order from './pages/order/index'
import Common from './common'
import OrderDetail from './pages/order/detail'

export default class IRouter extends React.Component{
  render(){
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" render={()=>{
            return (
              <Admin>
                <Route path="/admin/ui/buttons" component={Button} />
                <Route path="/admin/ui/modals" component={Modals} />
                <Route path="/admin/ui/loadings" component={Loadings} />
                <Route path="/admin/ui/notification" component={Notice} />
                <Route path="/admin/ui/messages" component={Messages} />
                <Route path="/admin/ui/tabs" component={Tabs} />
                <Route path="/admin/ui/gallery" component={Gallery} />
                <Route path="/admin/ui/carousel" component={Carousel} />
                <Route path="/admin/form/login" component={FormLogin} />
                <Route path="/admin/form/reg" component={FormRegister} />
                <Route path="/admin/table/basic" component={BasicTable} />
                <Route path="/admin/city" component={City} />
                <Route path="/admin/order" component={Order} />
              </Admin>
            )
          }}></Route>
          <Route path="/common" render={()=>{
            return (
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
              </Common>
            )
          }} />
        </App>
      </HashRouter>
    )

  }
}