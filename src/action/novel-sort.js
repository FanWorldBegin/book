import { SET_CATEGORY_LIST } from "./constants";
//查询小说分类
const setCategoryList = res => {
  return {
    type: SET_CATEGORY_LIST,
    filter: res,
  };
};

export const setCategoryListAsync = ({
  queryType,
  pageIndex,
  categoryList,
}) => {
  return async dispatch => {
    var res = await categoryList(queryType, pageIndex);
    dispatch(setCategoryList(res));
  };
};

// //小说分类分页加
// export const cateListPagingAdd = (res) => {
//   return {
//     type: CATE_LIST_PAGING_ADD,
//     filter: res
//   }
// }

// //小说分类分页减
// export const cateListPagingMinus = () => {
//   return {
//     type: CATE_LIST_PAGING_MINUS,
//   }
// }
