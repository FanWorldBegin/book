import React, { Component } from 'react';
import { HeaderBack } from '../component/header-back';
import { connect } from 'react-redux';
import { setNovelDetailAsync, setNovelChapterAsync } from '../action/index';
import { novelState, categories } from '../config/req-filter';
import { ChapterList } from '../component/chapter-list';

function GMTToStr(time){
  let date = new Date(time)
  let Str = date.getFullYear() + '/' +
    (date.getMonth() + 1) + '/' +
    date.getDate() + ' ' +
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds()
  return Str
}


 class NovelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

  }

  componentDidMount() {
    this.query(this.props.location.state.ID);
  }

  query = async(ID) => {
    this.setState({
      loading: true,
    })
    await this.props.setNovelDetailAsync(ID);
    await this.props.setNovelChapterAsync(ID);

    this.setState({
      loading: false,
    })
  }
  //截取最新章节
   sliceChapters = (chapters) => {
     return chapters.slice(0,3);
  }
  render() {
    const {  novelDetail, chapters } = this.props;
    let { loading } = this.state;
    var sliceChapters = this.sliceChapters(chapters);
    return (
      <div className='novel-container'>
        <HeaderBack/>
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
                              <span className='name'>{item.ChapterName}</span>
                            </div>
                          )
                        })
                      }
                    </div> 
                  }
                </React.Fragment>
              </div>
              <div className='content-detail'>
                <div className='title'>{novelDetail.NovelName} 正文</div>
                <ChapterList List={chapters.reverse()} total={(chapters || []).length} query={e=>{}}/>
              </div>
            </React.Fragment>
          )
        }
      </div>
    )
  }
}

//在reducer 中创建counter 的reducer
const mapStateToProps = (state) => {
  console.log(state)
  const { novelItem = {} } = state
  return {
    novelDetail: novelItem.novelDetail,
    chapters: novelItem.chapters,
  }
}

export default connect(mapStateToProps, { setNovelDetailAsync, setNovelChapterAsync })(NovelItem)