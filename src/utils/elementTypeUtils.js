import _ from "lodash";
import { getArchiveState } from "../store/utility";

export function getTypes() {
  return getArchiveState().elementTypes;
}

export function find(options, types) {
  types = types || getTypes();

  return _.find(types, options);
}

export function findById(id, types) {
  return find({ _id: id }, types);
}

export function findByName(name, types) {
  return find({ name }, types);
}

export function findExpand(defaultName) {
  return find({ name: `${defaultName}-expand` });
}
