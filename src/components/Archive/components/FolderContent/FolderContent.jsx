import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { Table } from "react-bootstrap";
import Icon from "./../../../common/Icon/Icon";
import { getChildren } from "../../../../services/elementService";
import { format } from "../../../../utils/elementUtils";
import style from "./FolderContent.module.css";

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
      <div className="section">
        <Table size="sm" striped hover responsive className={style.table}>
          <thead className={style.header}>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Date</th>
              <th>Labels</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((element) => {
              const { name, createdAt, labels } = format(element);

              const type = this.props.elementTypes.find(
                (type) => type.id === element.type
              );

              return (
                <tr onDoubleClick={() => onSelectElement(element)}>
                  <td className="w-1 align-middle">
                    <Icon name={type.icon} />
                  </td>
                  <td className="w-5 align-middle">{name}</td>
                  <td className="w-2 align-middle">{createdAt}</td>
                  <td className="w-4 align-middle">{labels}</td>
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
