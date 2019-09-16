import { RequestClass } from 'uke-request';
const $R = new RequestClass();
// 可以为每一个请求对象设置配置
$R.setConfig({
  baseUrl: 'http://52.196.57.193:3070/ncc', // 默认的请求地址
  commonHeaders: {} // 所有的请求 headers
});


export {
  $R,
  // PollingEntity
};