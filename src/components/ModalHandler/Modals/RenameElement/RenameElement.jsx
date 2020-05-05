import ElementForm from "./../../../common/ElementForm/ElementForm";
import { mapping } from "../../../../utils/objectUtils";

class RenameElement extends ElementForm {
  componentDidMount() {
    const { element, onInitForm } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => doSubmit(this.state.data);

    this.setState({ data: this.mapToViewModel(element) });
  }

  mapToViewModel(element) {
    return mapping(element, this.props.keys);
  }

  render() {
    return super.render();
  }
}

export default RenameElement;
