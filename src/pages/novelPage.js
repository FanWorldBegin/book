import React, { Component } from "react";
import HeaderBack from "../component/header-back";
import { connect } from "react-redux";
import { setChapterDetailAsync, getNewChapterAsync } from "../action";
import { css } from "@emotion/core";
import NovelBar from "../component/novel-bar";
import { navigate } from "gatsby";

const fontSizeObj = {
  big: { fontSize: "22px" },
  mid: { fontSize: "18px" },
  sml: { fontSize: "14px" },
};
const backColor = {
  yellow: { backgroundColor: "rgba(251, 246, 235, 1.0)" },
  green: { backgroundColor: "rgba(220, 235, 210, 1.0)" },
};
const closeLightStyle = {
  color: "rgba(204, 204, 204, 1.0)",
  backgroundColor: "rgba(50, 55, 59, 1.0)",
};

const navigateContainer = {
  yellow: {
    color: "rgba(0, 128, 0, 1.0)",
    backgroundColor: "rgba(106, 110, 128, 0.1)",
  },
  black: {
    color: "rgba(204, 204, 204, 1.0)",
    backgroundColor: "rgba(106, 110, 128, 0.1)",
  },
};
class NovelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fontSize: "mid",
      backColorCon: "yellow",
      closeLight: false, //是否关灯
      fontSize: 'mid',
    };
  }

  componentDidMount() {
    const { location = {} } = this.props;
    const { state = {} } = location;
    this.query(state.ID);
  }

  query = async () => {
    this.setState({
      loading: true,
    });
    const { location = {} } = this.props;
    const { state = {} } = location;
    const { API = {} } = this.props;
    if (API.searchChapterDetail) {
      await this.props.setChapterDetailAsync({
        ID: state.ID,
        searchChapterDetail: API.searchChapterDetail,
      });
      this.setState({
        loading: false,
      });
    }
  };
  setFont = fontSize => {
    this.setState({
      fontSize,
    });
  }
  setBackColor = backColor => {
    console.log(backColor);
    this.setState({
      backColorCon: backColor,
    });
  }

  ifCloseLight = closeLight => {
    console.log(closeLight);
    this.setState({
      closeLight,
    });
  }

  queryNewChapter = async Flag => {
    this.setState({
      loading: true,
    });
    const { API } = this.props;
    if (API.searchChapterNext) {
      await this.props.getNewChapterAsync({
        ID: this.props.location.state.ID,
        Flag,
        searchChapterNext: API.searchChapterNext,
      });
      console.log(this.props);
      const { chapterDetail = {} } = this.props;
      const { ID } = chapterDetail;
      console.log(ID);
      if (ID !== 0) {
        navigate(`/novelPage/`, {
          state: {
            ID: ID,
          },
        });
      }
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    var { loading, fontSize, backColorCon, closeLight } = this.state;
    const { chapterDetail = {}, location } = this.props;
    var content = (chapterDetail.Content || "").replace(/↵/g, `\n`);
    return (
      <div className="novelPage-container">
        <HeaderBack
          title={chapterDetail.ChapterName}
          query={this.query}
          {...this.props}/>
        {loading ? (
          <img className="loading" src={require("../assets/loading.svg")} />
        ) : (
          <React.Fragment>
            <NovelBar
              fontSize={fontSize}
              setFont={this.setFont}
              setBackColor={this.setBackColor}
              ifCloseLight={this.ifCloseLight}/>
            <div
              className="content"
              css={[
                fontSizeObj[fontSize],
                backColor[backColorCon],
                closeLight ? [closeLightStyle] : "",
              ]}>
              <div
                className="navigate-container"
                css={
                  closeLight
                    ? navigateContainer["black"]
                    : navigateContainer["yellow"]
                }>
                <div
                  onClick={e => {
                    this.queryNewChapter(0);
                  }}>
                  上一章
                </div>
                <div
                  onClick={e => {
                    navigate(`/novel/`, {
                      state: {
                        ID: chapterDetail.NovelID,
                      },
                    });
                  }}>
                  回目录
                </div>
                <div
                  onClick={e => {
                    this.queryNewChapter(1);
                  }}>
                  下一章
                </div>
                <div
                  onClick={e => {
                    navigate(`/bookrack`);
                  }}>
                  进书架
                </div>
              </div>
              <div className="title">{chapterDetail.ChapterName}</div>
              <div className="content-detail">{content}</div>

              <div
                className="navigate-container"
                css={
                  closeLight
                    ? navigateContainer["black"]
                    : navigateContainer["yellow"]
                }>
                <div
                  onClick={e => {
                    this.queryNewChapter(0);
                  }}>
                  上一章
                </div>
                <div
                  onClick={e => {
                    navigate(`/novel`, {
                      state: {
                        ID: chapterDetail.NovelID,
                      },
                    });
                  }}>
                  回目录
                </div>
                <div
                  onClick={e => {
                    this.queryNewChapter(1);
                  }}>
                  下一章
                </div>
                <div onClick={e => {}}>进书架</div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

//在reducer 中创建counter 的reducer
const mapStateToProps = state => {
  const { novelItem = {} } = state;
  return {
    chapterDetail: novelItem.chapterDetail,
  };
};

export default connect(
  mapStateToProps,
  { setChapterDetailAsync, getNewChapterAsync }
)(NovelPage);
