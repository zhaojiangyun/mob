//1. 先导入axios对象
import axios from 'axios';
import store from '../store.js'
import router from '../router.js'
//2. 创建axios的对象
const Server = axios.create({
    baseURL: "", //基础url地址
    timeout: 3000,//超时时间
});

//3. 请求拦截器配置
Server.interceptors.request.use((config) => {
    // 公共请求接口

    // 添加到头中去
    config.headers['token'] = store.state.token;
    // 提交loading到vuex中
	store.commit('setLoading',true);
    return config;
}, (error) => {
    return Promise.reject(error);
});

//4. 相应拦截器
Server.interceptors.response.use((response) => {
    console.log(response);
    //过滤返回的data值
    if (response.status == 200) {
		setTimeout(()=>{
			// 数据请求完成后消失
			store.commit('setLoading',false)
		},1500)
        return response.data;
    }

    return response;
}, (error) => {
   // // token过期
   // if(error.response.data.errorCode==20000){
	  //  // 退出登录
	  //  store.commit('logOut');
	  //  router.push('/demo/login');
   // }
    return Promise.reject(error);
});

//5. 抛出对象接口
export default Server;