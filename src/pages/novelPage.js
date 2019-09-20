import React, { Component } from 'react';
import { HeaderBack } from '../component/header-back';
import { connect } from 'react-redux';
import { setChapterDetailAsync } from '../action';
import { css } from "@emotion/core"

const fontSizeObj = {
  big: {fontSize: '20px'},
  mid: { fontSize: '16px' },
  sml: { fontSize: '12px' },
}
const backColor = {
  yel: {backgroundColor: 'rgba(251, 246, 235, 1.0)'}, 
  green: { backgroundColor: 'rgba(220, 235, 210, 1.0)'}
}
class NovelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fontSize: 'mid',
      backColorCon: 'yel',
    };
  }

  componentDidMount() {
    this.query(this.props.location.state.ID);
  }

  query = async () => {
    this.setState({
      loading: true,
    });
    await this.props.setChapterDetailAsync(this.props.location.state.ID);
    this.setState({
      loading: false,
    });

  }

  render() {
    var { loading, fontSize, backColorCon } = this.state;
    const { chapterDetail={} } = this.props;
    var content = (chapterDetail.Content || '').replace(/↵/g, `\n`);
    return (
      <div className='novelPage-container'>
        <HeaderBack title={chapterDetail.ChapterName}/>
        {
          loading ? <img className='loading' src={require('../assets/loading.svg')} /> : (
            <React.Fragment>
              <div className='content' css={[fontSizeObj[fontSize], backColor[backColorCon]] }>
                {
                  content
                }
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
  const { novelItem={} } = state
  return {
    chapterDetail: novelItem.chapterDetail,
  }
}


export default connect(mapStateToProps, { setChapterDetailAsync })(NovelPage);