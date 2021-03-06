import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from '../utils/utils'

export default class Axios {
    static requestList(context,url,params){
        var data = {
            params: params
        }
        this.ajax({
            url:url,
            data
        }).then((data)=>{
            if(data){
                let list = data.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                })
                context.setState({
                    list,
                    pagination:Utils.pagination(data,(current)=>{
                        context.params.page = current;
                        context.requestList();
                    }),
                })
            }
        })
    }


    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                // eslint-disable-next-line eqeqeq
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                // eslint-disable-next-line eqeqeq
                if (response.status == '200'){
                    let res = response.data;
                    // eslint-disable-next-line eqeqeq
                    if (res.code == '0'){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}