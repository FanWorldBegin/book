// import { RequestClass } from 'uke-request';
// import { navigate } from 'gatsby'
// var RObj = {}
// if (typeof window !== `undefined`) {
//   const $R = new RequestClass();
//   // 可以为每一个请求对象设置配置
//   var Token = '';
//   if (localStorage.getItem('userInfo')) {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     Token = userInfo.Token;
//   }
//   $R.setConfig({
//     baseUrl: 'http://52.196.57.193:3070/ncc', // 默认的请求地址
//     commonHeaders: {
//       Authorization: Token,
//     },// 所有的请求 headers
//   });

//   // 统一的检查 res status 的状态，如果 return false，则触发 onErr
//   $R.checkStatus = (originRes={}) => {
//     console.log(originRes)
//     console.log(originRes.status)
//     if (originRes.status == 200) {
//       return true;
//     } else {
//       return false;
//     }

//   }
//   // 每当发生错误时执行
//   $R.on('onErr', (resDetail) => {
//     const { originRes } = resDetail;
//     if (originRes.status == 401) {
//       localStorage.removeItem('userInfo');
//       // navigate('/')
//     }
//   });

//   RObj = {
//     $R: $R ? $R : {}
//   }
// }
// export {
//   RObj,
// };


import { RequestClass } from 'uke-request';
import { navigate } from 'gatsby';
console.log('filter');

const $R = new RequestClass();
// 可以为每一个请求对象设置配置
var Token = '';
if (!!localStorage.getItem('userInfo') && localStorage.getItem('userInfo') !== 'undefined') {
  console.log(!!localStorage.getItem('userInfo'));
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  Token = userInfo.Token;
  console.log(Token);
}
$R.setConfig({
  baseUrl: 'http://52.196.57.193:3070/ncc', // 默认的请求地址
  commonHeaders: {
    Authorization: Token,
  },// 所有的请求 headers
});

// 统一的检查 res status 的状态，如果 return false，则触发 onErr
$R.checkStatus = (originRes = {}) => {
  if ((originRes || {}).status == 200) {
    return true;
  } else {
    return false;
  }

};
// 每当发生错误时执行
$R.on('onErr', (resDetail) => {
  const { originRes } = resDetail;
  if ((originRes || {}).status == 401) {
    // localStorage.removeItem('userInfo');
    navigate('/login/');
  }
});


export {
  $R
};

