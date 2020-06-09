import http from "./httpService";

const apiEndpoint = "/element-activities";

// function elementUrl(id) {
//   return `${apiEndpoint}/${id}`;
// }

export async function getAllActivities() {
  return http.get(apiEndpoint);
}

// export async function getActivity(id) {
//   return elementActivities.find((activity) => activity._id === id);
// }

export async function getElementActivities(elementId) {
  return http.get(apiEndpoint, {
    params: { elementId },
  });
}

export default { getAllActivities, getElementActivities };
