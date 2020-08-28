const elementTypes = [
  {
    _id: 1,
    name: "file",
    extensions: ["*"],
    icon: "file",
    color: "black",
  },
  {
    _id: 2,
    name: "pdf",
    extensions: ["pdf"],
    icon: "file-pdf",
    color: "red",
  },
  {
    _id: 3,
    name: "word",
    extensions: ["doc"],
    icon: "file-word",
    color: "blue",
  },
  {
    _id: 257,
    name: "root",
    icon: "archive",
  },
  {
    _id: 258,
    name: "folder",
    icon: "folder",
  },
  {
    _id: 258,
    name: "folder-expand",
    icon: "folder-open",
  },
  {
    _id: 259,
    name: "label",
    icon: "tag",
  },
  {
    _id: 260,
    name: "labels",
    icon: "tags",
  },
];

// 1-256 === documents
// 257-512 === folders

export async function getAllElementTypes() {
  return elementTypes;
}

export default {
  getAllElementTypes,
};
