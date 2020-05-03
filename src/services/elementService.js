const elements = [
  {
    _id: "20",
    name: "2019",
    type: 258,
    parentId: "1",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "21",
    name: "Jan",
    type: 258,
    parentId: "20",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "25",
    name: "Feb",
    type: 258,
    parentId: "20",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "22",
    name: "Invoice Icelandair 2019",
    type: 1,
    parentId: "21",
    labels: ["2", "6"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "26",
    name: "Contract Impark 2019",
    type: 1,
    parentId: "25",
    labels: ["1", "5"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "28",
    name: "Letter Canada 2019",
    type: 1,
    parentId: "25",
    labels: ["4"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "30",
    name: "2020",
    type: 258,
    parentId: "1",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "31",
    name: "Jan",
    type: 258,
    parentId: "30",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "32",
    name: "Invoice Icelandair 2020",
    type: 1,
    parentId: "31",
    labels: ["2", "6"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "35",
    name: "Feb",
    type: 258,
    parentId: "30",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "36",
    name: "Contract Impark 2020",
    type: 1,
    parentId: "35",
    labels: ["1", "5"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "38",
    name: "Letter Canada 2020",
    type: 1,
    parentId: "35",
    labels: ["4"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "40",
    name: "2021",
    type: 258,
    parentId: "1",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "41",
    name: "Jan",
    type: 258,
    parentId: "40",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "42",
    name: "Invoice Icelandair 2021",
    type: 1,
    parentId: "41",
    labels: ["2", "6"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "46",
    name: "Contract Impark 2021",
    type: 1,
    parentId: "45",
    labels: ["1", "5"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "48",
    name: "Letter Canada 2021",
    type: 1,
    parentId: "45",
    labels: ["4"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "45",
    name: "Feb",
    type: 258,
    parentId: "40",
    labels: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export async function saveElement(element) {
  return null;
}

export async function getAllElements() {
  return elements;
}

// function findElement(id, children, child) {}

export async function getElement(id) {
  // return findElement(id, )
}

export async function getChildren(elementId) {
  return elements.filter((element) => elementId === element.parentId);
}

export default { getAllElements, getChildren };
