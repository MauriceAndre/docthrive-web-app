import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { Table } from "react-bootstrap";
import Icon from "./../../../common/Icon/Icon";
import { getChildren } from "../../../../services/elementService";
import { formatToDate } from "../../../../utils/dateUtils";

class FolderContent extends Component {
  state = { elements: [] };

  componentDidMount = async () => {
    await this.updateElements();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.element !== prevProps.element) {
      await this.updateElements();
    }
  };

  updateElements = async () => {
    const { element } = this.props;
    const elements = await getChildren(element.id);
    this.setState({ elements });
  };

  static getDerivedStateFromProps = async ({ element }, prevState) => {
    if (element !== prevState.element) {
      return { element: await getChildren(element.id) };
    } else return null;
  };

  render() {
    const { elements } = this.state;
    const { onSelectElement } = this.props;

    return (
      <div className="h-100">
        <Table size="sm" striped hover responsive>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Date</th>
              <th>Labels</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((element) => {
              const { name, createdAt, labels } = element;

              const type = this.props.elementTypes.find(
                (type) => type.id === element.type
              );

              return (
                <tr onDoubleClick={() => onSelectElement(element)}>
                  <td className="align-middle">
                    <Icon name={type.icon} />
                  </td>
                  <td className="align-middle">{name}</td>
                  <td className="align-middle">{formatToDate(createdAt)}</td>
                  <td className="align-middle">
                    {labels && labels.join(", ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    elementTypes: state.archive.elementTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectElement: (element) =>
      dispatch(actionCreators.setSelectedElement(element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderContent);
