import React, { Component } from 'react';
import { Link } from "gatsby";
export default class NovellistItem extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  withDetail = (novelList) => {
    return (
      (novelList || []).map(item => {
        const { Novel = {} } = item;
        return (
          <Link to={`/novel`} state={{ ID: Novel.ID }} className='item-container' key={`${item.ID}${item.Sort}`}>
            <div className='item-img'>
              <img src={Novel.PicUrl} />
            </div>
            <div className='item-content'>
              <div className='title'>
                {Novel.NovelName}
              </div>
              <div className='author'>
                作者：{Novel.Author}
              </div>
              <div className='Description'>
                {Novel.Description}
              </div>
            </div>
          </Link>
        )
      })
    )
  }


  noDetail = (novelList) => {
    return (
      (novelList || []).map((item, index) => {
        const { Novel = {} } = item;
        return (
          index == 0 ? 
            <div className='item-container' key={`${item.ID}${item.Sort}`}>
              <div className='item-img'>
                <img src={Novel.PicUrl} />
              </div>
              <div className='item-content'>
                <div className='title'>
                  {Novel.NovelName}
                </div>
                <div className='author'>
                  作者：{Novel.Author}
                </div>
                <div className='Description'>
                  {Novel.Description}
                </div>
              </div>
            </div> :
            <div className='item-simple-container' key={`${item.ID}${item.Sort}`}>
              <span className='title'>
                {Novel.NovelName}
              </span> /

              <span className='author'>
                  {Novel.Author}
              </span>
            </div>
        )
      })
    )
  }

  render() {
    const { novelList, detail} = this.props;
    return (
      <div className='novellist-item'>
        {
          detail ? this.withDetail(novelList) : this.noDetail(novelList)
        }
      </div>
    )
  }
}