import React, { Component } from 'react';
import HeaderBack from '../component/header-back';
import { connect } from 'react-redux';
import { setNovelDetailAsync, setNovelChapterAsync } from '../action/index';
import { novelState, categories } from '../config/structure';
import { ChapterList } from '../component/chapter-list';
import { Link, navigate} from "gatsby";

function GMTToStr(time){
  let date = new Date(time);
  let Str = date.getFullYear() + '/' +
    (date.getMonth() + 1) + '/' +
    date.getDate() + ' ' +
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds();
  return Str;
}


class NovelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

  }

  componentDidMount() {
    const { location = {} } = this.props;
    const { state } = location;
    console.log('novel');
    console.log(this.props);
    this.query((state || {}).ID);
  }

  query = async(ID) => {
    this.setState({
      loading: true,
    });
    const { API = {} } = this.props;
    if (API.getNovelDetail) {
      await this.props.setNovelDetailAsync({
        ID,
        getNovelDetail: API.getNovelDetail
      });
    }
    if (API.searchChapters) {
      await this.props.setNovelChapterAsync({
        ID,
        searchChapters: API.searchChapters
      });
    }

    this.setState({
      loading: false,
    });
  }
  //截取最新章节
   sliceChapters = (chapters=[]) => {
     return chapters.slice(0,3);
   }

   addCollection = async() => {
     const { userInfo = {}, novelDetail={}, API={} } = this.props;
     const { NovelName, ID } = novelDetail;
     console.log(novelDetail);
     if (userInfo.Token) {
       var res = await API.addCollection({ NovelName, NovelID:ID});
       console.log(res);
     } else {
       navigate(
         "/login/",
       );
     }
   }

   delCollection = async (ID) => {
     const { userInfo = {}, API={} } = this.props;
     if (userInfo.Token) {
       var res = await API.delCollection({ ID });
     } else {
       navigate(
         "/login/",
       );
     }
   }
   render() {
     const { novelDetail = {}, chapters, location={}} = this.props;
     let { loading } = this.state;
     var sliceChapters = this.sliceChapters(chapters);
     const { CollectionID } = novelDetail;
     const { ID } = location.state || {};

     return (
       <div className='novel-container'>
         <HeaderBack {...this.props}/>
         {
           loading ? <img className='loading' src={require('../assets/loading.svg')} /> : (
             <React.Fragment>
               <div className='main-describe'>
                 <div className='novel-cover'>
                   <img src={novelDetail.PicUrl} />
                 </div>
                 <div className='novel-detail'>
                   <div className='title'>{novelDetail.NovelName}</div>
                   <div><span>作者：</span>{novelDetail.Author}</div>
                   <div className='black'><span>分类：</span>{novelDetail.Categories ? categories[novelDetail.Categories] : '暂无'}</div>
                   <div><span>状态：</span>{novelState[novelDetail.Status]}</div>
                   <div><span>更新：</span>{GMTToStr(novelDetail.UpdatedAt)}</div>
                   <div className='black'><span>最新：</span>{novelDetail.NewUpdateChapter ? novelDetail.NewUpdateChapter : '暂无'}</div>
                 </div>      
               </div>
               <div className='btn-container'>
                 <button className='novel-button' 
                   onClick={
                     e=>{
                       // var chapterReverse = chapters.reverse();
                       const chapterOne = (chapters || [])[0];
                       navigate(
                         `/novelPage/`,
                         {
                           state: { ID: chapterOne.ID },
                         }
                       );
                     }
                   }>开始阅读</button>
                 {
                   CollectionID == 0 ? (
                     <button className='novel-button' onClick={
                       async e => {
                         await this.addCollection();
                         this.query(ID);
                       }
                     }>加入书架</button>
                   ) : (
                     <button className='novel-button' onClick={
                       async e => {
                         await this.delCollection(CollectionID);
                         this.query(ID);
                       }
                     }>移除书架</button>
                   )
                 }
               </div>
               <div className='content-detail'>
                 <div className='title'>{novelDetail.NovelName} 小说简介</div>
                 <div className='describe'>{novelDetail.Description}</div>
               </div>
               <div className='content-detail'>
                 <div className='title'>{novelDetail.NovelName} 最新章节</div>
                 <React.Fragment>
                   {
                     <div className='list-items'>
                       {
                         sliceChapters.map(item => {
                           // console.log(item.ChapterName)
                           return (
                             <div key={item.ID} className='list-item'>
                               <Link to={`/novelPage/`}
                                 state={{
                                   ID: item.ID,
                                 }}>
                                 <span className='name'>{item.ChapterName}</span>
                               </Link>
                             </div>
                           );
                         })
                       }
                     </div> 
                   }
                 </React.Fragment>
               </div>
               <div className='content-detail'>
                 <div className='title'>{novelDetail.NovelName} 正文</div>
                 <ChapterList List={(chapters || []).reverse()} total={(chapters || []).length} query={e => { }}/>
               </div>
             </React.Fragment>
           )
         }
       </div>
     );
   }
}

//在reducer 中创建counter 的reducer
const mapStateToProps = (state) => {
  console.log(state);
  const { novelItem = {}, users={} } = state;
  return {
    novelDetail: novelItem.novelDetail,
    chapters: novelItem.chapters,
    userInfo: users.userInfo,
  };
};

export default connect(mapStateToProps, { setNovelDetailAsync, setNovelChapterAsync })(NovelItem);