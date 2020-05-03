const elementTypes = [
  {
    _id: 1,
    name: "file",
    extensions: ["*"],
    icon: "file",
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
];

// 1-256 === documents
// 257-512 === folders

export async function getAllElementTypes() {
  return elementTypes;
}

export default {
  getAllElementTypes,
};
