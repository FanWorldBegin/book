import React, { Component } from 'react';
export default class NovellistItem extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    const { novelList } = this.props;
    return (
      <div className='novellist-item'>
        {
          (novelList || []).map(item => {
            console.log(item)
            const { Novel={} } = item;
            return (
              <div className='item-container'>
                <div className='item-img'>
                  <img src={Novel.PicUrl}/>
                </div>
                <div className='item-content'>
                  <div className='title'>
                    {Novel.NovelName}
                  </div>
                  <div className='author'>
                    {Novel.Author}
                  </div>
                  <div className='Description'>
                    {Novel.Description}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}