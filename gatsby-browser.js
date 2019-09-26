// import "./src/styles/index.css"

//在最外层包装
import * as action from './src/action/index';
const React = require('react');

const Wrapper = ({ element, props }) => {
  const isMobile = /iPhone|Android|iOS/.test(navigator.userAgent);

  React.useEffect(() => {
  }, []);
  return (
    <div className={isMobile ? 'mobile' : 'desktop'}>
      {React.cloneElement(element, {
        ...props,
        action: { ...action},
        isMobile
      })}
    </div>
  );
};

export const wrapPageElement = ({ element, props }) => {
  return (
    <Wrapper element={element} props={props}/>
  );
};