import axios from 'axios';
import qs from 'qs';

const configBaseURL = function(val) {
  // cust service
  if (val.startsWith('/cust')) {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API_cust;
  } else if (val.startsWith('/office/Blood_Test')) {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API_yanke;
  } else if (val.startsWith('/office/Surgical_Department')) {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API_waike;
  } else if (val.startsWith('/office/Internal_Medicine')) {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API_neike;
  }
};

// 全局设置头部信息
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 全局设置超时时间
axios.defaults.timeout = 2000000;

// 响应拦截
axios.interceptors.response.use(
  function(response) {
    // console.log(response);
    // 处理响应数据
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  function(error) {
    console.log(error);
    // 处理响应失败
    return Promise.reject(error);
  }
);

// 封装请求方法 - get请求
export function get(url, params) {
  configBaseURL(url);
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

// 封装请求方法 - post请求
export function post(url, params) {
  configBaseURL(url);
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
