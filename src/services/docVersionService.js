const docVersions = [
  {
    _id: "1",
    elementId: "22",
    workVersion: true,
    extension: "ppt",
    type: 1,
    createdAt: Date.now(),
    url:
      "https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_500kB.ppt",
    version: "2.0",
  },
  {
    _id: "2",
    elementId: "26",
    workVersion: true,
    extension: "xls",
    type: 1,
    createdAt: Date.now(),
    url:
      "https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_100.xls",
    version: "10.0",
  },
  {
    _id: "3",
    elementId: "28",
    workVersion: true,
    extension: "docx",
    type: 1,
    createdAt: Date.now(),
    url:
      "https://file-examples.com/wp-content/uploads/2017/02/file-sample_500kB.docx",
    version: "3.0",
  },
];

export async function getAllDocVersions() {
  return docVersions;
}

export async function getDocVersion(id) {
  return docVersions.find((docVersion) => docVersion._id === id);
}

export function getWorkVersion(elementId) {
  return docVersions.find(
    (docVersion) => docVersion.elementId === elementId && docVersion.workVersion
  );
}

export default { getAllDocVersions, getDocVersion, getWorkVersion };
