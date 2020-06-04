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
      const components = compact([
        Header && <Header />,
        render ? render(props) : <Component {...props} />,
        Footer && <Footer />,
      ]);
      return <React.Fragment>{components}</React.Fragment>;
    };
  } else if (Component || render) {
    rest.component = Component;
    rest.render = render;
  }

  return <RRDRoute {...rest} />;
}

export default Route;
