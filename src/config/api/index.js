import { $R } from '../req-filter';
const routes = {
  novelsets: '/novelsets', //首页展示
  newupdatenovels: '/newupdatenovels', //根据条件查询设置的页面展示小说;
  
}

/**
 * 首页展示小说;
 * @param {*} data 
 * @param {*} ID 
 */
export async function novelsets(typeID) {
  console.log('发送了')
  return await $R.get(routes.novelsets, {
    params: {
      PageNum: 2,
      PageSize: 1,
      SetType: typeID,
    }
  });
}


/**
 * 根据条件查询设置的页面展示小说;
 * @param {*} data 
 * @param {*} ID 
 */
export async function newupdatenovels(ID) {
  console.log('发送了')
  return await $R.get(routes.newupdatenovels, {
    params: {
      PageNum: 2, 
      PageSize: 1
    }
  } );
}
