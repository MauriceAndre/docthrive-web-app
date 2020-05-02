const elementActivities = [
  {
    _id: "1",
    elementId: "20",
    createdAt: Date.now(),
    action: {
      name: "CREATE",
      params: {
        name: "2010",
      },
    },
  },
  {
    _id: "2",
    elementId: "20",
    createdAt: Date.now(),
    action: {
      name: "RENAME",
      params: {
        name: {
          before: "2010",
          after: "2019",
        },
      },
    },
  },
  {
    _id: "3",
    elementId: "20",
    createdAt: Date.now(),
    action: {
      name: "EDIT_META",
      params: {
        labels: [{ _id: "1", name: "contract" }],
      },
    },
  },
  {
    _id: "4",
    elementId: "20",
    createdAt: Date.now(),
    action: {
      name: "MOVE",
      params: {
        from: {
          parent: {
            _id: "2",
            name: "Test",
          },
          path: "Archive/Test",
        },
        to: {
          parent: {
            _id: "3",
            name: "Years",
          },
          path: "Archive/Years",
        },
      },
    },
  },
  {
    _id: "5",
    elementId: "20",
    createdAt: Date.now(),
    action: { name: "DELETE", params: {} },
  },
];

export async function getAllActivities() {
  return elementActivities;
}

export async function getActivity(id) {
  return elementActivities.find((activity) => activity._id === id);
}

export async function getElementActivities(elementId) {
  return elementActivities.filter(
    (activity) => activity.elementId === elementId
  );
}

export default { getAllActivities, getActivity, getElementActivities };
