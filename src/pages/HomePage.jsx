import React from 'react';
import {
  addNote,
  getActiveNotes,
  getArchivedNotes,
  archiveNote,
  unarchiveNote,
  deleteNote
} from '../utils/index';
import NoteLists from '../components/notes-list';
import ArchiveList from '../components/archive-list';
import FormContainer from '../components/form-container';
import SearchBar from '../components/search-bar';
import { useSearchParams } from 'react-router-dom';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [archivedNotes, setArchivedNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  // Fungsi ambil semua data notes
  async function getNotes() {
    const activeResponse = await getActiveNotes();
    const archivedResponse = await getArchivedNotes();

    const activeNotes = activeResponse.data || [];
    const archivedNotes = archivedResponse.data || [];

    setNotes(activeNotes);
    setArchivedNotes(archivedNotes);
  }

  React.useEffect(() => {
    getNotes();
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const filteredArchived = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  async function onAddNotesHandler({ title, body }) {
    const result = await addNote({ title, body });
    if (!result.error) {
      getNotes();
    }
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);
    getNotes();
  }

  async function onUnarchiveHandler(id) {
    await unarchiveNote(id);
    getNotes();
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
        <SearchBar onSearch={onKeywordChangeHandler} />
        <NoteLists
          notes={filteredNotes}
          onArchive={onArchiveHandler}
          onDelete={onDeleteHandler}
        />
      </section>

      <section className='archive-container'>
        <h1>Archive Notes</h1>
        <ArchiveList
          notes={filteredArchived}
          onUnarchive={onUnarchiveHandler}
          onDelete={onDeleteHandler}
        />
      </section>
    </div>
  );
}

export default HomePage;
