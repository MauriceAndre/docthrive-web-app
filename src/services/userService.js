import http from "./httpService";

const apiEndpoint = "/users";

// function elementUrl(id) {
//   return `${apiEndpoint}/${id}`;
// }

export async function createUser(user) {
  return http.post(apiEndpoint, user);
}
