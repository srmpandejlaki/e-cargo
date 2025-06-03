import React from 'react';
import {
  addNote,
  getActiveNotes,
  deleteNote
} from '../utils/index';
import NoteLists from '../components/notes-list';
import FormContainer from '../components/form-container';
import FormSideAContainer from '../components/side_server/form-side-a';
import FormSideBContainer from '../components/side_server/form-side-b';

function HomePage() {
  const [notes, setNotes] = React.useState([]);
  const [serverType, setServerType] = React.useState('server-utama');
  const [keyword, setKeyword] = React.useState('');

  // Ambil server dari localStorage saat komponen dimount
  React.useEffect(() => {
    const server = localStorage.getItem('server') || 'server-utama';
    setServerType(server);
    getNotes();
  }, []);

  // Ambil data catatan
  async function getNotes() {
    const activeResponse = await getActiveNotes();
    const activeNotes = activeResponse.data || [];
    setNotes(activeNotes);
  }

  const filteredNotes = notes.filter((note) =>
    note.title?.toLowerCase().includes(keyword.toLowerCase())
  );

  async function onAddNotesHandler({ namaBarang, daerahAsal, daerahTujuan, totalBiaya }) {
    const result = await addNote({ namaBarang, daerahAsal, daerahTujuan, totalBiaya });
    if (!result.error) {
      getNotes();
    }
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);
    getNotes();
  }

  // Render form berdasarkan server yang dipilih saat register
  const renderForm = () => {
    switch (serverType) {
      case 'master':
        return <FormContainer addNotes={onAddNotesHandler} />;
      case 'side-a':
        return <FormSideAContainer addNotes={onAddNotesHandler} />;
      case 'side-b':
        return <FormSideBContainer addNotes={onAddNotesHandler} />;
      default:
        return <p>Server tidak dikenali.</p>;
    }
  };

  return (
    <div className='main'>
      <section>{renderForm()}</section>

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
