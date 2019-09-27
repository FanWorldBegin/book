import React, { Component } from "react"
import { Link } from "gatsby"

const pageSize = 1
export class NovelList extends Component {
  constructor(props) {
    super(props)
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
    } = this.props
    return (
      <div className="list-items">
        {rankList.map(item => {
          return (
            <Link to={`/novel`} state={{ ID: item.ID }} key={item.ID}>
              <div key={item.ID} className="list-item">
                <span className="name">{item.NovelName}</span> /
                <span className="author">{item.Author}</span>
              </div>
            </Link>
          )
        })}
        <div className="paging-container">
          <div
            className="paging-item"
            onClick={async e => {
              if (pageIndex > 1) {
                pageIndexMinus()
                query({ queryType, pageIndex })
              }
            }}
          >
            上页
          </div>
          <div
            className="paging-item paging-item2"
            onClick={async e => {
              if (pageIndex < Math.ceil(total / pageSize)) {
                pageIndexAdd(total)
                query({ queryType, pageIndex })
              }
            }}
          >
            下页
          </div>

          <div
            className="paging-item paging-item2"
            onClick={async e => {
              if (pageIndex != Math.ceil(total / pageSize)) {
                pageIndexEnd(total)
                query({ queryType, pageIndex })
              }
            }}
          >
            尾页
          </div>
        </div>
        <div className="paging-describe">
          <div className="paging-item">共{Math.ceil(total / pageSize)}页</div>
          <div className="paging-item paging-item2">当前 第{pageIndex}页</div>
        </div>
      </div>
    )
  }
}
