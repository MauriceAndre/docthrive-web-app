import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import ElementForm from "./../../../common/ElementForm";

class MoveElement extends ElementForm {
  componentDidMount() {
    super.componentDidMount();
    const { onInitForm } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => doSubmit(this.state.data);
  }

  render() {
    return super.render();
  }
}

const mapStateToProps = ({ archive }) => {
  return {
    elements: archive.elements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChildren: (...params) => dispatch(actionCreators.getChildren(...params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveElement);
