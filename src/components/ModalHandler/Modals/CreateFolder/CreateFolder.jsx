import ElementForm from "./../../../common/ElementForm";

class CreateFolder extends ElementForm {
  componentDidMount() {
    const { onInitForm } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => doSubmit(this.state.data);
  }

  render() {
    return super.render();
  }
}

export default CreateFolder;
