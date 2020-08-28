import _ from "lodash";
import { getAllElements } from "./elementService";

// const exampleSearch = {
//   index: {
//     parentId: "",
//     name: "",
//     type: "",
//     exactName: true,
//     labels: [],
//     createdAt: "",
//     deletedAt: "",
//     updatedAt: "",
//   },
//   type: {
//     documents: true,
//     typeIds: [],
//     labelsIds: [],
//   },
//   version: {},
//   options: {
//     orderBy: "",
//     sort: "desc",
//     totalCount: 10,
//     ids: "",
//     deleted: true,
//     onlyDeleted: false,
//   },
// };

export async function getSearchResult(options) {
  const elements = await getAllElements();
  return _.filter(elements, options.index);
}
