import React, { Component } from 'react';
import { Link } from "gatsby"

export class ChapterList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
    }
  }

  componentDidMount() {
  }

  // 分割数组
  sliceChapter(arr, size) {
    let chapterList = {};
    var index = 0;
    for (var i = 0; i < arr.length; i=i+size) {
      chapterList[index] = arr.slice(i, i + size);
      chapterList.length=index;
      index +=1;    
    }
    return chapterList;
  }
  render() {
    const { List = [], total = 0, query, queryType, loading } = this.props;
    let { pageIndex } = this.state;
    let silceList = this.sliceChapter(List, 20);
    let nowList = silceList[pageIndex-1];
    return (
      <div className='list-items'>
        {
          nowList.map(item => {
            console.log(item.ChapterName)
            return (
              <div key={item.ID} className='list-item'>
                <Link to='novelPage'
                state={{
                  ID: item.ID
                }}
                ><span className='name'>{item.ChapterName}</span> </Link>
              </div>
            )
          })
        }
        <div className='paging-container'>
          <div className='paging-item ' onClick={
            e => {

              this.setState({
                pageIndex: pageIndex > 1 ? pageIndex - 1 : 1
              }, () => {
                if (pageIndex != 1) {
                  let { pageIndex } = this.state;
                  query({ queryType, pageIndex })
                }
              })

            }
          }>上页</div>
          <div className='paging-item paging-item2' onClick={
            e => {
              this.setState({
                pageIndex: pageIndex < Math.ceil(total / 20) ? pageIndex + 1 : Math.ceil(total / 20)
              }, () => {

                // let { pageIndex } = this.state;
                // query({ queryType, pageIndex })
              })
            }
          }>下页</div>
          <div className='paging-item paging-item2' onClick={
            e => {
              this.setState({
                pageIndex: Math.ceil(total / 20),
              }, () => {
                query({ queryType, pageIndex: Math.ceil(total / 20) })
              })

            }
          }>尾页</div>
        </div>
        <div className='paging-describe'>
          <div className='paging-item'>共{Math.ceil(total / 20)}页</div>
          <div className='paging-item paging-item2'>当前 第{pageIndex}页</div>
        </div>
      </div>
    )
  }

}
