import { RequestClass } from 'uke-request';

const $R = new RequestClass();
// 可以为每一个请求对象设置配置
$R.setConfig({
  baseUrl: 'http://52.196.57.193:3070/ncc', // 默认的请求地址
  commonHeaders: {} // 所有的请求 headers
});


export {
  $R,
};

export const categories = [
  { name: '玄幻魔法', categories: 1 },
  { name: '武侠修真', categories: 2 },
  { name: '都市言情', categories: 3 },
  { name: '历史军事', categories: 4 },
  { name: '侦探推理', categories: 5 },
  { name: '网游动漫', categories: 6 },
  { name: '科幻灵异', categories: 7 },
]

export const novelState = {
  1: '已完本',
  2: '连载中',
  3: '已下架'
}