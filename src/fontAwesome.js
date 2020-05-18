import { library } from "@fortawesome/fontawesome-svg-core";
import * as solid from "@fortawesome/free-solid-svg-icons";

const elementTypes = [
  solid.faArchive,
  solid.faFolder,
  solid.faFolderOpen,
  solid.faFile,
  solid.faFilePdf,
  solid.faFileWord,
];

const tools = [
  solid.faCopy,
  solid.faPen,
  solid.faFileDownload,
  solid.faPrint,
  solid.faFolderPlus,
  solid.faArrowRight,
  solid.faTrashAlt,
  solid.faList,
  solid.faTh,
  solid.faThLarge,
  solid.faSortAmountUpAlt,
  solid.faSortAmountDownAlt,
  solid.faArrowUp,
];

const views = [solid.faCalendarAlt, solid.faTag, solid.faTags];

const rest = [
  solid.faBell,
  solid.faPlus,
  solid.faBars,
  solid.faUserCircle,
  solid.faSearch,
  solid.faCheck,
  solid.faExpandAlt,
  solid.faInfoCircle,
];

library.add(...elementTypes, ...tools, ...views, ...rest);
