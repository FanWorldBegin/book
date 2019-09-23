import React, { Component } from 'react';
import { Link } from "gatsby"

export class NovelList extends Component {

  constructor(props) {
    super(props);
    this.state= {
      pageIndex: 1,
    }
  }

  componentDidMount() {
  }

  render() {
    const { rankList = [], total = 0, query, queryType, loading} = this.props;

    let { pageIndex } = this.state;
    return (
      <div className='list-items'>
        {
          rankList.map(item => {
  
            return (
              <div key={item.ID} className='list-item'>
                <span className='name'>{item.NovelName}</span> /
                    <span className='author'>{item.Author}</span>

              </div>
            )
          })
        }
        <div className='paging-container'>
          <div className='paging-item' onClick={
            e => {

              this.setState({
                pageIndex: pageIndex > 1 ? pageIndex - 1 : 1
              }, () => {
                  if (pageIndex != 1) {
                    let { pageIndex } = this.state;
                    query({ queryType, pageIndex})
                  }
              })

            }
          }>上页</div>
          <div className='paging-item paging-item2' onClick={
            e=>{
              this.setState({
                pageIndex: pageIndex < Math.ceil(total / 20) ? pageIndex + 1 : Math.ceil(total / 20)
              }, () =>{

                  let { pageIndex } = this.state;
                  query({ queryType, pageIndex })
              })
            }
          }>下页</div>
          <div className='paging-item paging-item2' onClick={
            e=>{
              this.setState({
                pageIndex: Math.ceil(total / 20),
              }, () => {
                  query({ queryType, pageIndex: Math.ceil(total / 20) })
              })
             
            }
          }>尾页</div>
        </div>
        <div className='paging-describe'>
          <div className='paging-item'>共{Math.ceil(total/20)}页</div>
          <div className='paging-item paging-item2'>当前 第{pageIndex}页</div>
        </div>
      </div>
    )
  }

}
