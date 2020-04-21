import ElementForm from "./../../../common/ElementForm";
import { mapping } from "./../../../../utils/objectUtils";

class CopyElementForm extends ElementForm {
  componentDidMount() {
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

export default CopyElementForm;
