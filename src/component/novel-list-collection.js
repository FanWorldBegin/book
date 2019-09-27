import React, { Component } from "react";
import { Link } from "gatsby";

const pageSize = 20;
export class NovelListCollection extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {
      rankList = [],
      total = 0,
      query,
      queryType,
      pageIndex,
      pageIndexAdd,
      pageIndexMinus,
      pageIndexEnd,
    } = this.props;
    return (
      <div className="list-items">
        {rankList.map(item => {
          const { Novel = {} } = item;
          console.log(Novel);
          return (
            <div key={`${item.ID}${item.Sort}`}>
              <Link
                to={`/novel`}
                state={{ ID: Novel.ID }}
                className="item-container">
                <div className="item-img">
                  <img src={Novel.PicUrl} />
                </div>
                <div className="item-content">
                  <div className="title">{Novel.NovelName}</div>
                  <div className="author">作者：{Novel.Author}</div>
                  <div className="author">更新到：{Novel.NewUpdateChapter ? Novel.NewUpdateChapter : '暂无'}</div>
                </div>
              </Link>
            </div>
          );
        })}
        <div className="paging-container">
          <div
            className="paging-item"
            onClick={async e => {
              if (pageIndex > 1) {
                pageIndexMinus();
                query({ queryType, pageIndex });
              }
            }}>
            上页
          </div>
          <div
            className="paging-item paging-item2"
            onClick={async e => {
              if (pageIndex < Math.ceil(total / pageSize)) {
                pageIndexAdd(total);
                query({ queryType, pageIndex });
              }
            }}>
            下页
          </div>

          <div
            className="paging-item paging-item2"
            onClick={async e => {
              if (pageIndex != Math.ceil(total / pageSize)) {
                pageIndexEnd(total);
                query({ queryType, pageIndex });
              }
            }}>
            尾页
          </div>
        </div>
        <div className="paging-describe">
          <div className="paging-item">共{Math.ceil(total / pageSize)}页</div>
          <div className="paging-item paging-item2">当前 第{pageIndex}页</div>
        </div>
      </div>
    );
  }
}
