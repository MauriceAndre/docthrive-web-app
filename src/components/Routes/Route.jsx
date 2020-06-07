import React from "react";
import { Route as RRDRoute } from "react-router-dom";
import { compact } from "../../utils/arrayUtils";

function Route({
  header: Header,
  footer: Footer,
  render,
  component: Component,
  ...rest
}) {
  if (Header || Footer) {
    rest.render = (props) => {
      Header = Header && (
        <div className="section-wrapper section-fill">
          <Header />
        </div>
      );
      Component = render ? render(props) : <Component {...props} />;
      Footer = Footer && (
        <div className="section-wrapper">
          <Footer />
        </div>
      );

      const components = compact([
        Header,
        <div className="section-wrapper">{Component}</div>,
        Footer,
      ]);
      return (
        <React.Fragment>
          <div className="section section-column">{components}</div>
        </React.Fragment>
      );
    };
  } else if (Component || render) {
    rest.component = Component;
    rest.render = render;
  }

  return <RRDRoute {...rest} />;
}

export default Route;
