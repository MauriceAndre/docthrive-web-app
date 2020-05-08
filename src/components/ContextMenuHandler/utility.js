import store from "./../../store";
import * as actionCreators from "./../../store/actions/index";

export const onContextMenu = (event, props) => {
  event.preventDefault();
  store.dispatch(
    actionCreators.setContextMenu({
      show: true,
      x: event.clientX,
      y: event.clientY,
      ...props,
    })
  );
};
