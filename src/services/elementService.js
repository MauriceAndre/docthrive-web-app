import http from "./httpService";
import _ from "lodash";

const apiEndpoint = "/elements";

function elementUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function saveElement(element) {
  const id = element._id;
  element = { ...element };
  element.type = element.type._id;
  element.labels = element.labels.map(({ _id }) => _id);
  element = _.pick(element, ["name", "type", "parentId", "labels"]);

  if (id) {
    delete element._id;
    return await http.put(elementUrl(id), element);
  }

  return await http.post(apiEndpoint, element);
}

export function createElement(element) {
  element = { ...element };
  delete element._id;
  return saveElement(element);
}

export function updateElement(element) {
  return saveElement(element);
}

export async function getAllElements() {
  return await http.get(apiEndpoint);
}

export async function getChildren(parentId) {
  return await http.get(apiEndpoint, {
    params: { parentId },
  });
}

export async function deleteElement(id) {
  return await http.delete(elementUrl(id));
}

export default { getAllElements, getChildren };
