import React,{Component} from 'react'
import {Card,Button,Table,Form, Select,Modal, message} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option

class City extends Component {
    state = {
        isShowOpenCity:false,
    }

    params = {
        page:1,
    }
    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity:true
        })
    }

    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url:'/city/open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code=='0'){
                message.success('开通成功')
                this.setState({
                    isShowOpenCity:false
                })
            }
        })
    }

    componentDidMount(){
        this.requestList();
    }

    requestList = () => {
        axios.ajax({
            url:'/open_city',
            data:{
                params:{
                    page:this.params.page,
                }
            }
        }).then((res)=>{
            this.setState({
                list:res.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                }),
                pagination:Utils.pagination(res,(current)=>{
                    this.params.page = current;
                    this.requestList();
                }),
            })
        })
    }


    render() {
        const colums = [
            {
                title:'城市id',
                dataIndex:'id'
            },{
                title:'城市名称',
                dataIndex:'name'
            },{
                title:'用车模式',
                dataIndex:'mode',
                render(mode){
                    return mode == 1 ? '停车点' : '禁停区'
                }
            },{
                title:'运营模式',
                dataIndex:'op_mode',
                render(mode){
                    return mode == 1 ? '自营点' : '加盟区'
                }
            },{
                title:'授权加盟商',
                dataIndex:'franchisee_name'
            },{
                title:'城市管理员',
                dataIndex:'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name
                    }).join(',');
                }
            },{
                title:'城市开通时间',
                dataIndex:'open_time'
            },{
                title:'操作时间',
                dataIndex:'update_time',
                render:Utils.formateDate
            },{
                title:'操作人',
                dataIndex:'sys_user_name'
            },
        ]

        return (
            <div>
                <Card>
                    <FilterFrom></FilterFrom>
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>

                </Card>
                <div className="content-wrap">
                    <Table 
                        columns={colums}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal 
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false,
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}} />
                </Modal>
            </div>
        )
    }
}

class FilterFrom extends React.Component{
    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select 
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator('mode')(
                            <Select 
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="2">指定停车点模式</Option>
                                <Option value="3">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="运营模式">
                    {
                        getFieldDecorator('op_mode')(
                            <Select 
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="2">自营</Option>
                                <Option value="3">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator('auth_status')(
                            <Select 
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="2">进行中</Option>
                                <Option value="3">已授权</Option>
                                <Option value="3">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="">
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterFrom = Form.create({})(FilterFrom);

class OpenCityForm extends React.Component{
    render(){
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            },
        }

        const {getFieldDecorator} = this.props.form;

        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue:'1'
                        })(
                            <Select>
                                <Option value="">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">天津</Option>
                            </Select>
                        )
                    }
                    
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode',{
                            initialValue:'1'
                        })(
                            <Select>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('mode',{
                            initialValue:'1'
                        })(
                            <Select>
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

OpenCityForm = Form.create({})(OpenCityForm);

export default City