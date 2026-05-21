import { addNote, listNotes } from "./notes.js";

const command = process.argv[2];
const text = process.argv.slice(3).join(" ");

if (command === "add") {
  addNote(text);
} else if (command === "list") {
  for (const note of listNotes()) {
    console.log(note.text);
  }
} else {
  console.log("Usage: node src/cli.js add <text> | list");
}