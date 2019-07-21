import React,{Component} from 'react'
import {Input,Select,Form,Button,Checkbox,Radio,DatePicker} from 'antd'
import Utils from './../../utils/utils'
const FormItem = Form.Item;
const Option = Select.Option;

class FilterFrom extends React.Component{
    state = {
        orderInfo:{},
        orderConfirmVisble:false
    }

    params = {
        page:1
    }

    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]

    initFormList = () => {
        const { getFieldDecorator }  = this.props.form;
        const formList = this.props.formList;
        const formListItem = [];

        if(formList && formList.length > 0){
            formList.forEach((item,i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type=='时间查询'){
                    const begin_time = (
                        <FormItem label="订单时间" key={field}>
                            {
                                getFieldDecorator('begin_time',{
                                    initialValue:initialValue,
                                })(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>
                    )
                    formListItem.push(begin_time)
                    const end_time = (
                        <FormItem label="~" colon={false} key={field}>
                            {
                                getFieldDecorator('end_time',{
                                    initialValue:initialValue,
                                })(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>
                    )
                    formListItem.push(end_time)
                }else if(item.type=='INPUT'){
                    const INPUT = (
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field],{
                                    initialValue:initialValue,
                                })(
                                    <Input type="text" placeholder={placeholder} />
                                )
                            }
                        </FormItem>
                    )
                    formListItem.push(INPUT)
                }else if(item.type=='SELECT'){
                    const SELECT = (
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field],{
                                    initialValue:initialValue,
                                })(
                                    <Select 
                                        style={{width:width}}
                                        placeholder={placeholder}
                                    >
                                        {
                                            Utils.getOptionList(item.list)
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                    )
                    formListItem.push(SELECT)
                }else if(item.type=='CHECKBOX'){
                    const CHECKBOX = (
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field],{
                                    initialValue:initialValue,
                                    valuePropName:'checked'
                                })(
                                    <Checkbox>{label}</Checkbox>
                                )
                            }
                        </FormItem>
                    )
                    formListItem.push(CHECKBOX)
                }
            });
        }
        return formListItem;
    }

    handleFilterSubmit = () => {
        let filedsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(filedsValue);
    }

    render(){
        return (
           <Form layout="inline">
               {this.initFormList()}
               <FormItem label="">
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
           </Form>
        )
    }
}
FilterFrom = Form.create({})(FilterFrom);

export default FilterFrom