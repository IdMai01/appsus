import { storageService } from './async-storage-service.js';
import { utilService } from './util.service.js'


const NOTES_KEY = 'notes';


export const noteService = {
    query,
    remove,
};

const gNotes = [
    {

        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            title: "lorem lorem",
            txt: "lorem ipsum!"
        }
    },
    {

        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg",
            title: "Rick and morty"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {

        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "to-do list",
            todos: [
                { txt: "first thing", doneAt: null },
                { txt: "second thing", doneAt: 187111111 }
            ]
        }
    }
];


_createNotes();

function query() {
    return storageService.query(NOTES_KEY)
}
function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}
function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = gNotes
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}
