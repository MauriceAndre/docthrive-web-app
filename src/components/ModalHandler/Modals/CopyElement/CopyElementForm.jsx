import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import ElementForm from "./../../../common/ElementForm";
import { mapping } from "./../../../../utils/objectUtils";

class CopyElementForm extends ElementForm {
  componentDidMount() {
    super.componentDidMount();
    const { srcElement, onInitForm } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => doSubmit(this.state.data);

    this.setState({ data: this.mapToViewModel(srcElement) });
  }

  mapToViewModel(element) {
    return mapping(element, ["name", "labels"]);
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
    getChildren: (parentId) => dispatch(actionCreators.getChildren(parentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyElementForm);
