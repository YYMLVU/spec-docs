import { listUsers } from "./api.js";

export function handleUsersRequest() {
  return listUsers();
}
