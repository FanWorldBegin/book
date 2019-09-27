import { $R } from "../req-filter";

const routes = {
  novelsets: "/novelsets", //首页展示
  newupdatenovels: "/newupdatenovels", //根据条件查询设置的页面展示小说;
  rankingtypes: "/rankingtypes", //查询小说排行分类
  rankings: "/rankings", //查询小说排行
  novels: "/novels", //根据条件查询书籍
  novel: "/novel", //根据书籍ID查询书籍
  chapters: "/novel/chapters", // 根据章节ID查询章节
  chapter: "/chapter", //根据ID查询章节
  chapterNext: "/chapter/next", //查询下一章或上一章
  customer: "/customer", //注册会员
  login: "/login", //登录
  logout: "/logout", //登出
  collection: "/collection", //创建收藏;
  collections: "/collections", // 根据会员ID查询收藏
};

/**
 *  删除收藏
 * @param {*} NovelID
 * @param {*} ID
 */
export async function delCollection({ ID }) {
  return await $R.del(`${routes.collection}?ID=${ID}`, {});
}

/**
 *  查询收藏
 * @param {*} NovelID
 * @param {*} ID
 */
export async function queryCollection({ pageIndex }) {
  var Token = "";
  if (localStorage.getItem("userInfo")) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    Token = userInfo.Token;
    console.log(Token);
  }
  return await $R.get({
    url: routes.collections,
    params: {
      PageNum: pageIndex,
      PageSize: 20,
    },
    headers: {
      Authorization: Token,
    },
  });
}

/**
 *  创建收藏
 * @param {*} NovelID
 * @param {*} ID
 */
export async function addCollection({ NovelID, NovelName }) {
  return await $R.post(routes.collection, {
    NovelID,
    NovelName,
  });
}

/**
 *  注册
 * @param {*} data
 * @param {*} ID
 */
export async function userLogout() {
  return await $R.post(routes.logout);
}

/**
 *  登录
 * @param {*} data
 * @param {*} ID
 */
export async function userLogin({ Password, Username }) {
  return await $R.post(routes.login, {
    Password,
    Username,
  });
}

/**
 *  注册
 * @param {*} data
 * @param {*} ID
 */
export async function userRegister({ Account, LoginPassword }) {
  return await $R.post(routes.customer, {
    Account,
    LoginPassword,
  });
}

/**
 * 查询下一章或上一章;
 * @param {*} data
 * @param {*} ID
 */
export async function searchChapterNext({ ID, Flag }) {
  return await $R.get(routes.chapterNext, {
    params: {
      ID,
      Flag,
    },
  });
}

/**
 * 查看小说章节;
 * @param {*} data
 * @param {*} ID
 */
export async function searchChapterDetail(ID) {
  return await $R.get(routes.chapter, {
    params: {
      ID,
    },
  });
}

/**
 * 查看小说章节列表;
 * @param {*} data
 * @param {*} ID
 */
export async function searchChapters(NovelID) {
  return await $R.get(routes.chapters, {
    params: {
      NovelID,
    },
  });
}

/**
 * 首页展示小说;
 * @param {*} data
 * @param {*} ID
 */
export async function novelsets(typeID) {
  console.log("发送了");
  return await $R.get(routes.novelsets, {
    params: {
      PageNum: 1,
      PageSize: 20,
      SetType: typeID,
    },
  });
}

/**
 * 根据条件查询设置的页面展示小说;
 * @param {*} data
 * @param {*} ID
 */
export async function newupdatenovels() {
  console.log("发送了");
  return await $R.get(routes.newupdatenovels, {
    params: {
      PageNum: 2,
      PageSize: 20,
    },
  });
}

/**
 * 查询小说排行分类;
 */
export async function rankingtypes() {
  return await $R.get(routes.rankingtypes);
}

/**
 * 查询小说排行分类;
 */
export async function rankingList({ pageIndex, type }) {
  return await $R.get(routes.rankings, {
    params: {
      PageNum: pageIndex,
      PageSize: 20,
      RankingTypeID: type,
    },
  });
}

/**
 * 查询小说分类列表;
 */
export async function categoryList(type, pageNumber) {
  return await $R.get(routes.novels, {
    params: {
      PageNum: pageNumber,
      PageSize: 20,
      Categorie: type,
    },
  });
}

/**
 * 全本小说列表查询;
 */
export async function getwholeNovelList({ pageIndex }) {
  return await $R.get(routes.novels, {
    params: {
      PageNum: pageIndex,
      PageSize: 20,
      Status: 1, //已完结
    },
  });
}

/**
 * 根据书籍ID查询书籍;
 */
export async function getNovelDetail(ID) {
  return await $R.get(routes.novel, {
    params: {
      ID: ID,
    },
  });
}
