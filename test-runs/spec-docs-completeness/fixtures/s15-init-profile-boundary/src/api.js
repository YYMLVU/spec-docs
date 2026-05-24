import { readUsers } from "./db.js";

export function listUsers() {
  return readUsers().map((user) => ({
    id: user.id,
    displayName: user.displayName
  }));
}
