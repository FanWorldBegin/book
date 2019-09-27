import React, { Component } from "react";

export default class NovelBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      active: "mid",
      protectEye: false,
      closeLight: false,
    };
  }

  componentDidMount() {}

  render() {
    var {  protectEye, closeLight } = this.state;
    const { setFont, setBackColor, ifCloseLight, fontSize } = this.props;
    return (
      <div className="novelbar-container">
        <div className="font-container">
          <span
            className={fontSize == "big" ? "active" : ""}
            onClick={e => {
              setFont("big");
              this.setState({
                active: "big",
              });
            }}>
            大
          </span>
          <span
            className={fontSize == "mid" ? "active" : ""}
            onClick={e => {
              setFont("mid");
              this.setState({
                active: "mid",
              });
            }}>
            中
          </span>
          <span
            className={fontSize == "sml" ? "active" : ""}
            onClick={e => {
              setFont("sml");
              this.setState({
                active: "sml",
              });
            }}>
            小
          </span>
        </div>
        <div className="back-container">
          <span
            className={protectEye == true ? "active" : ""}
            onClick={e => {
              setBackColor(protectEye ? "yellow" : "green");
              this.setState({
                protectEye: !protectEye,
                closeLight: false,
              });
            }}>
            护眼
          </span>

          <span
            className={closeLight == true ? "active" : ""}
            onClick={e => {
              ifCloseLight(closeLight ? false : true);
              this.setState({
                closeLight: !closeLight,
                protectEye: false,
              });
            }}>
            关灯
          </span>
        </div>
      </div>
    );
  }
}
