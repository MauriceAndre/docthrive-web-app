import store from "./../../store";
import * as actionCreators from "./../../store/actions/index";
import {
  moveElement,
  copyElement,
  deleteElement,
  createFolder,
  renameElement,
} from "./../../components/ModalHandler/actions/index";
import { elementMeta } from "./../../components/SidebarHandler/actions/index";
import { isFolder, isDocument, isRoot } from "./../../utils/elementUtils";
import { t, initT } from "./../../utils/intl";

const setModal = (modal) => store.dispatch(actionCreators.setModal(modal));
const setSidebar = (sidebar) =>
  store.dispatch(actionCreators.setSidebar(sidebar));

export const getTools = (element) => {
  initT(null, "toolbar");

  return [
    {
      key: "move",
      text: t("move"),
      icon: "arrow-right",
      onClick: () => setModal(moveElement(element)),
      isDisabled: isRoot(element),
    },
    {
      key: "copy",
      text: t("copy"),
      icon: "copy",
      onClick: () => setModal(copyElement(element)),
      isDisabled: isRoot(element),
    },
    {
      key: "delete",
      text: t("delete"),
      icon: {
        className: "fas fa-trash-alt",
      },
      onClick: () => setModal(deleteElement(element)),
      isDisabled: isRoot(element),
    },
    {
      key: "rename",
      text: t("rename"),
      icon: "pen",
      onClick: () => setModal(renameElement(element)),
      isDisabled: isRoot(element),
    },
    {
      key: "",
      text: "Download",
      icon: "file-download",
      onClick: ({ name }, { url, extension }) => {
        let a = document.createElement("a");
        a.href = url;
        a.download = `${name}.${extension}`;
        a.click();
      },
      isHidden: isFolder(element),
    },
    {
      key: "print",
      text: "Print",
      icon: "print",
      onClick: () => {},
      isHidden: isFolder(element),
    },
    {
      key: "newFolder",
      text: t("newFolder"),
      icon: "folder-plus",
      onClick: () => setModal(createFolder(element._id)),
      isHidden: isDocument(element),
    },
    {
      key: "showMeta",
      text: t("showMeta"),
      icon: "info-circle",
      classes: "d-md-none",
      onClick: () => setSidebar(elementMeta(element)),
    },
  ];
};

export const getVisibleTools = (element) => {
  const tools = getTools(element);

  return tools.filter(({ isHidden }) => !isHidden);
};
