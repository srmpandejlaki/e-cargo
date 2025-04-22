import React from 'react';
import {
  addNote,
  getActiveNotes,
  deleteNote
} from '../utils/index';
import NoteLists from '../components/notes-list';
import FormContainer from '../components/form-container';

function HomePage() {
  const [notes, setNotes] = React.useState([]);

  // Fungsi ambil semua data notes
  async function getNotes() {
    const activeResponse = await getActiveNotes();

    const activeNotes = activeResponse.data || [];

    setNotes(activeNotes);
  }

  React.useEffect(() => {
    getNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  async function onAddNotesHandler({ title, body }) {
    const result = await addNote({ title, body });
    if (!result.error) {
      getNotes();
    }
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);
    getNotes();
  }

  return (
    <div className='main'>
      <section>
        <FormContainer addNotes={onAddNotesHandler} />
      </section>

      <section className='app-container'>
        <NoteLists
          notes={filteredNotes}
          onDelete={onDeleteHandler}
        />
      </section>
    </div>
  );
}

export default HomePage;
