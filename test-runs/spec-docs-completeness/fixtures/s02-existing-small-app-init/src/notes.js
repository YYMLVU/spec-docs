const notes = [];

export function addNote(text) {
  notes.push({ text, createdAt: new Date().toISOString() });
}

export function listNotes() {
  return notes.slice();
}