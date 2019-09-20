import { $R } from '../req-filter';

const routes = {
  novelsets: '/novelsets', //首页展示
  newupdatenovels: '/newupdatenovels', //根据条件查询设置的页面展示小说;
  rankingtypes: '/rankingtypes', //查询小说排行分类
  rankings: '/rankings', //查询小说排行
  novels: '/novels', //根据条件查询书籍
  novel: '/novel', //根据书籍ID查询书籍
  chapters: '/novel/chapters', // 根据章节ID查询章节
  chapter: '/chapter', //根据ID查询章节
  
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
    }
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
      NovelID
,
    }
  });
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
      PageSize: 20,
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
      PageSize: 20
    }
  } );
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
export async function rankingList(type) {
  return await $R.get(routes.rankings, {
    params: {
      PageNum: 1,
      PageSize: 20,
      RankingTypeID: type,
    }
  });
}


/**
 * 查询小说分类列表;
 */
export async function categoryList(type, pageNumber) {
  console.log('pageNumber')
  console.log(pageNumber)
  return await $R.get(routes.novels, {
    params: {
      PageNum: pageNumber,
      PageSize: 20,
      Categorie: type,
    }
  });
}


/**
 * 全本小说列表查询;
 */
export async function getwholeNovelList(type, pageNumber) {
  console.log('pageNumber')
  console.log(pageNumber)
  return await $R.get(routes.novels, {
    params: {
      PageNum: pageNumber,
      PageSize: 20,
      Status: 1, //已完结
    }
  });
}



/**
 * 根据书籍ID查询书籍;
 */
export async function getNovelDetail(ID) {
  return await $R.get(routes.novel, {
    params: {
      ID: ID
    }
  });
}
